// OOP version

// _______________________________________________________________________________________________________________________________item constructor

class Item {
    constructor (item) {
        Object.assign(this, item);
        // new properties
        this.like = false;
        this.maxAmountInStore = Math.round(Math.random() * 400 + 1000);
        this.orderInfo.ordersNumber = this.calculationOrdersNumber(); 
        this.isToBuy = this.orderInfo.inStock > 0;
    }

    // like  toggle logic
    toggleLike(){
        return this.like = !this.like;
    }

    
    // add coma and calculating orders number
    calculationOrdersNumber () {
        let result = 0;
        let num = this.maxAmountInStore - this.orderInfo.inStock + '';
        let num2 = null;
            
        if (num.length > 3) {
            num2 = num.split('');
            num2.splice(-3, 0, ",")
            result = num2.join('');
        } else {result = num};
    
        return result;      
    }

}

// ________________________________________________________________________________________products list with Item instances and methods for looking

class ItemsList {
    constructor () {
        this.items = items.map(item => new Item(item));
    }
    // find 
    findItems(filter) {
        let result = this.items;
        
        for (let key in filter) {
            if (key === "name") {
                result = result.filter(item => item.name.toLowerCase().includes(filter[key].toLowerCase()));
            }          
        }
        for (let key in filter) {
            if (key === "color" && filter[key].length !== 0) {
                result = result.filter(item => {
                    for (let ch of filter[key]) {
                        if (item.color.includes(ch)){
                            return item;
                        }
                    }  
                })
            }          
        }
        for (let key in filter) {
            if (key === "storage" && filter[key].length !== 0) {
                result = result.filter(item => {
                    if (filter[key].includes(item.storage)) {
                        return item;
                    }
                })
            }          
        }
        for (let key in filter) {
            if (key === "os" && filter[key].length !== 0) {
                result = result.filter(item => {
                    if (filter[key].includes(item.os)) {
                        return item;
                    }
                })
            }          
        }
        
        

        return result;
    }


    get availableColors() {
        return Array.from(new Set(this.items
            .reduce((acc, item) => [...acc, ...item.color], []))).sort();
    }

    get availableStorage() {
        return this.items
            .map(item => item.storage)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null)
            .sort((a, b) => {return a - b});
    }

    get availableOs() {
        return this.items
            .map(item => item.os)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null)
            .sort((a, b) => {return a - b});
    }

    get availableDisplay() {
        return this.items
            .map(item => item.display)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null)
            .sort((a, b) => {return a - b});
    }

    get availablePrice() {
        return this.items
            .map(item => item.price)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null)
            .sort((a, b) => {return a - b});
    }

}

//________________________________________________________________________________________________________________________________ render cards class

class RenderCards {
    constructor () {
        this.containerForCards = document.querySelector('.container-for-cards');
        this.renderCards(itemsList.items);
    }

    // render One card
    static renderCard (item) {
        // new element DOM for card
        const productCard = document.createElement('div');
        productCard.className = "product-card";

        productCard.innerHTML = `
            <div class="product-card-container">
                <img class="product-like" src="img/like_empty.svg" alt="like">
                <img class="product-card__img" src="${item.imgUrl}" alt=${item.name}>
                <h2 class="product-title">${item.name}</h2>
                <h3 class="product-stock-status"><span class="bold-text">${item.orderInfo.inStock}</span> left in stock</h3>
                <h3 class="product-price">Price: <span class="bold-text">${item.price}</span> $</h3>
                <button class="product-card__btn">Add to cart</button>
            </div>
            <div class="product-footer-container">
                <div class="product-footer-item-1">
                    <p class="product-reviews"><span class="bold-text">${item.orderInfo.reviews}%</span> Positive reviews </p>
                    <p class="product-footer-item-1-paragraph">Above average</p>
                </div>
                <div class="product-footer-item-2">
                    <p class="product-orders">${item.orderInfo.ordersNumber}</p>
                    <p>orders</p>
                </div>
            </div>     
        `;

        // btn add to cart
        const btnAddToCart = productCard.querySelector('.product-card__btn');
        const stockStatus = productCard.querySelector(".product-stock-status");
        
        if (item.orderInfo.inStock === 0) {
            stockStatus.classList.add("empty");
            btnAddToCart.classList.add("empty");
            btnAddToCart.disabled = true;   
        }
        
        // like button
        let likeOfProduct = productCard.querySelector(".product-like");

        if (item.like) {
            likeOfProduct.classList.add('active'); 
        }
        function getLike () {
            likeOfProduct.classList.toggle('active'); 
            item.toggleLike();
        }

        likeOfProduct.addEventListener("click", getLike);


        // modal window

        function callModalWindow(event) {
            const modalBackground = document.querySelector(".modal-background");
            const modalWindow = document.querySelector(".modal-window-container"); 
            const btn = productCard.querySelector('.product-card__btn');

            

            // cancel bubbling for like button and add to cart btn without stopPropagation
            if (event.target === likeOfProduct || event.target === btn) {
                return 
            }
            

            modalBackground.classList.add("modal_active");
            modalWindow.classList.add("modal_active");
            document.body.setAttribute("class", "modal_active");
   


            modalBackground.onclick = () => {
                modalBackground.classList.remove('modal_active');
                modalWindow.classList.remove('modal_active');
                document.body.removeAttribute('class');
            }

            modalWindow.innerHTML = `
                <img class="modal-  img modal-window__element-one" src="${item.imgUrl}" alt="${item.name}">
                <div class="modal-window__element-two">
                    <h2 class="product-title modal-window">${item.name}</h2>
                    <div class="product-footer-container modal-window">
                        <div class="product-footer-item-1">
                            <p class="product-reviews"><span class="bold-text">${item.orderInfo.reviews}%</span> Positive reviews</p>
                            <p class="product-footer-item-1-paragraph">Above average</p>
                        </div>
                        <div class="product-footer-item-2">
                            <p class="product-orders">${item.orderInfo.ordersNumber}</p>
                            <p>orders</p>
                        </div>
                    </div>
                    <div>
                        <p class="modal-window-product-color modal-window__element-two_paragraph"><span class="grey-text">Color:</span> ${item.color.join(', ')}</p>
                        <p class="modal-window-product-OS modal-window__element-two_paragraph"><span class="grey-text">Operating System:</span> ${item.os}</p>
                        <p class="modal-window-product-chip modal-window__element-two_paragraph"><span class="grey-text">Chip:</span> ${item.chip.name}</p>
                        <p class="modal-window-product-height modal-window__element-two_paragraph"><span class="grey-text">Height:</span> ${item.size.height} cm</p>
                        <p class="modal-window-product-width modal-window__element-two_paragraph"><span class="grey-text">Width:</span> ${item.size.width} cm</p>
                        <p class="modal-window-product-depth modal-window__element-two_paragraph"><span class="grey-text">Depth:</span> ${item.size.depth} cm</p>
                        <p class="modal-window-product-weight modal-window__element-two_paragraph"><span class="grey-text">Weight:</span> ${item.size.weight} kg</p>
                    </div>
        
                </div>
                <div class="modal-window__element-three">
                    <h3 class="product-price modal-window">${item.price} $</h3>
                    <h3 class="product-stock-status modal-window">Stock: ${item.orderInfo.inStock} pcs.</h3>
                    <button class="product-card__btn modal-window">Add to cart</button>
                </div>
            `
            // btn addToCart style in modal
            const btnModal = modalWindow.querySelector('.product-card__btn')
            if (item.orderInfo.inStock === 0) {
                btnModal.classList.add("empty");
                btnModal.disabled = true;                  
            }
        }

        productCard.addEventListener("click", callModalWindow);
   
        return productCard;
    }

    // render ALL cards
    renderCards (items) {
        // Clear container
        this.containerForCards.innerHTML = '';

        const cardsCollection = items.map(item => RenderCards.renderCard(item));

        return this.containerForCards.append(...cardsCollection);
    }
    
}


// ____________________________________________________________________________________set_FILTERS
class Filter {
    #itemsList = null;
    #renderCards = null;
    constructor(itemsList, renderCards) {
        this.name = '';
        this.sort = 'default';
        this.color = [];
        this.storage = [];
        this.price = [];
        this.os = [];
        this.display = [];
        this.#itemsList = itemsList;
        this.#renderCards = renderCards;
    }

    setFilter(key, value) {
        if (!Array.isArray(this[key])) {
            this[key] = value;
            this.#findAndRerender();
            // console.log("not array")
            return;
        }

        if (this[key].includes(value)) {
            this[key] = this[key].filter(val => val !== value);
        } else {
            this[key].push(value);
        }
        console.log(this)
        this.#findAndRerender();
        
    }

    #findAndRerender() {
        
        const items = this.#itemsList.findItems(filter);
        console.log(items, "items test list")
        this.#renderCards.renderCards(items);
    }
}

// _______________________________________________________________________________________________-render filters
class RenderFilters {
    #filter = null;
    constructor(itemsList, filter) {
        this.#filter = filter;
        this.accordionContainer = document.querySelector('.accordion');
        this.filterOptions = [
            {
                displayName: 'Price',
                name: 'price',
                options: itemsList.availablePrice,
            },
            {
                displayName: 'Color',
                name: 'color',
                options: itemsList.availableColors,
            },
            {
                displayName: 'Memory',
                name: 'storage',
                options: itemsList.availableStorage,
            },
            {
                displayName: 'OS',
                name: 'os',
                options: itemsList.availableOs,
            },
            {
                displayName: 'Display',
                name: 'display',
                options: itemsList.availableDisplay,
            },
        ];

        // input find by name
        this.inputName = document.getElementById('search');
        
        this.inputName.oninput = (event) => {
            const { value } = event.target;
            this.#filter.setFilter('name', value);
        }

        
        // this.selectSort = document.querySelector('.search-area__sort')

        // this.selectSort.onchange = (event) => {
        //     const { value } = event.target;
        //     this.#filter.setFilter('sort', value);
        // }

        this.renderFilters(this.filterOptions);
    }



    // _______________________________________________render filter 
    renderFilter(optionsData) {
        const accordionBtn = document.createElement('div');
        accordionBtn.className = 'accordion-btn';
        accordionBtn.innerHTML = `
            <h2>${optionsData.displayName}</h2><img class="accordion-btn__arrow"src="img/arrow_left.svg" alt="arrow">
        `;
        
        this.accordionContainer.append(accordionBtn);


        const accordionContent = document.createElement('div');
        accordionContent.className = 'accordion-content';
        
        
        const optionsElements = optionsData.options.map(option => {
            const filterOption = document.createElement('label');
            const checkbox = document.createElement('input');
            const checkboxName = document.createElement('span');

            checkbox.type = 'checkbox';
            checkbox.value = option;
            checkboxName.innerHTML = `${option}`;

            checkbox.onchange = () => {
                this.#filter.setFilter(optionsData.name, option);
                // console.log('checkbox')
            }
            filterOption.appendChild(checkbox);
            filterOption.appendChild(checkboxName);

            return filterOption;
        })

        accordionContent.append(...optionsElements);
        this.accordionContainer.append(accordionContent);

        // ___________________animation accordion

        accordionBtn.addEventListener('click', () => {
            const arrowBtn = accordionBtn.querySelector('.accordion-btn__arrow');            
            accordionBtn.classList.toggle('active');
            accordionContent.classList.toggle('active');
            arrowBtn.classList.toggle('active');
        })

    }



    // ______________________render filters
    renderFilters() {
        this.accordionContainer.innerHTML = '';

        const filtersElements = this.filterOptions.map(optionData => this.renderFilter(optionData));
        
        return filtersElements;  
    }
}



const itemsList = new ItemsList;
 
const renderCards = new RenderCards(itemsList);

const filter = new Filter(itemsList, renderCards);

const renderFilter = new RenderFilters(itemsList, filter);


// console.log(itemsList.availableColors) 
// console.log(itemsList.availableStorage) 
// console.log(itemsList.availableOs) 
// console.log(itemsList.availableDisplay) 
// console.log(renderFilter.filterOptions) 
// console.log(filter)
