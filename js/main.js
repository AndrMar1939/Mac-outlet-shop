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
    //____________________________________________________________________________find and filter logic 
    findItems(filter) {

        let result = this.items;     

        // name
        for (let key in filter) {
            if (key === "name") {
                result = result.filter(item => item.name.toLowerCase().includes(filter[key].toLowerCase()));
            }          
        }
        // color
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
        // memory
        for (let key in filter) {
            if (key === "storage" && filter[key].length !== 0) {
                result = result.filter(item => {
                    if (filter[key].includes(item.storage)) {
                        return item;
                    }
                })
            }          
        }
        // OS
        for (let key in filter) {
            if (key === "os" && filter[key].length !== 0) {
                result = result.filter(item => {
                    if (filter[key].includes(item.os)) {
                        return item;
                    }
                })
            }          
        }

        // correctly filter for screen size
        for (let key in filter) {
            if (key === "display" && filter[key].length !== 0) {
                console.log("Display")
                // let innerArr = result;
                result = result.filter(item => {
                    for (const ch of filter[key]) {
                        if (ch == "<5" && item.display < 5) {
                            return item;
                        }
                        if (ch == '5-7' && item.display >= 5 && item.display < 7) {
                            return item;
                        }
                        if (ch == '7-12' && item.display >= 7 && item.display < 12) {
                            return item;
                        }
                        if (ch == '12-16' && item.display >= 12 && item.display <= 16) {
                            return item;
                        }
                        if (ch == '+16' && item.display > 16) {
                            return item;
                        }   
                    }                 
                });               
            }          
        }
        // filter by price from to
        for (let key in filter) {
            if (key === "from") {
                let numMin = itemsList.availablePrice[0];
  
                if (key === 'from' && filter[key] > numMin) {
                  numMin = +filter[key];  
                  
                }
                result = result.filter(item => {
                    return item.price >= numMin;
                }) 
            }          
        }
        for (let key in filter) {
            if (key === "to") {
                let numMax = itemsList.availablePrice[itemsList.availablePrice.length-1];
                if (key === 'to' && filter[key] < numMax) {
                  numMax = +filter[key];  
 
                }
                result = result.filter(item => {
                    return item.price <= numMax;
                }) 
            }          
        }
        // sort by price asc desc
        for (let key in filter) {
            if (key === "sort") {               
                 if(filter[key] === 'default') {
                    result = result.sort((a,b) => {return a.id - b.id});
                } else if(filter[key] === 'ascending') {                    
                    result = result.sort((a,b) => {return a.price - b.price})
                } else if(filter[key] === 'descending') {                    
                    result = result.sort((a,b) => {return b.price - a.price})
                }
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
        let result = ['<5', '5-7', '7-12', '12-16', '+16'];
        return result.filter((item, index, arr) => arr.indexOf(item) === index)
       
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

        // btn add to cart style and addToCart()
        const btnAddToCart = productCard.querySelector('.product-card__btn');
        const stockStatus = productCard.querySelector(".product-stock-status");
        
        if (item.orderInfo.inStock === 0) {
            stockStatus.classList.add("empty");
            btnAddToCart.classList.add("empty");
            btnAddToCart.disabled = true;   
        }

        btnAddToCart.addEventListener('click', () => {
            cart.addToCart(item);
            renderCart.renderCartProducts(cart.items);
        })
        
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
                        <p class="modal-window-product-storage modal-window__element-two_paragraph"><span class="grey-text">Memory:</span> ${item.storage} gb</p>
                    </div>
        
                </div>
                <div class="modal-window__element-three">
                    <h3 class="product-price modal-window">${item.price} $</h3>
                    <h3 class="product-stock-status modal-window">Stock: ${item.orderInfo.inStock} pcs.</h3>
                    <button class="product-card__btn modal-window">Add to cart</button>
                </div>
            `
            // btn addToCart style in modal and addToCart()
            const btnModal = modalWindow.querySelector('.product-card__btn')
            if (item.orderInfo.inStock === 0) {
                btnModal.classList.add("empty");
                btnModal.disabled = true;                  
            }
            btnModal.addEventListener('click', () => {
                cart.addToCart(item);
                renderCart.renderCartProducts(cart.items);
            })
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
        this.from = 0;
        this.to = Infinity;
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


        this.sortFilter(this.#filter);
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
        
        if (optionsData.name !== "price") {
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
        } 
        // block for price filter   
        if (optionsData.name === "price") {
            const filterOptionMin = document.createElement('label');
            const filterOptionMax = document.createElement('label');
            const inputMinNumber = document.createElement('input');
            const inputMaxNumber = document.createElement('input');
            const inputMinName = document.createElement('p');
            const inputMaxName = document.createElement('p');
            accordionContent.className = "accordion-content-input";
            inputMinNumber.className = "accordion-content-input-number";
            inputMaxNumber.className = "accordion-content-input-number";
        
            inputMinNumber.type = 'number';
            inputMaxNumber.type = 'number';
            
            inputMinName.innerHTML = `From`;
            inputMaxName.innerHTML = `To`;
        
            inputMinNumber.oninput = (event) => {
                const { value } = event.target;
                this.#filter.setFilter('from', value);
            }
            inputMaxNumber.oninput = (event) => {
                let { value } = event.target;
                if (Number(value) >= itemsList.availablePrice[itemsList.availablePrice.length - 1]) {
                    event.target.value = itemsList.availablePrice[itemsList.availablePrice.length - 1];
                } else if(!value) {
                    value = Infinity;
                }
                this.#filter.setFilter('to', value);
            }
            if (Number(inputMinNumber.value) <= itemsList.availablePrice[0]) {                        
                inputMinNumber.value = itemsList.availablePrice[0];                        
            }


            filterOptionMin.append(inputMinName, inputMinNumber);
            filterOptionMax.append(inputMaxName, inputMaxNumber);     
            
            
            accordionContent.append(filterOptionMin, filterOptionMax);
            this.accordionContainer.append(accordionContent);
        }


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

    // sort filter
    sortFilter() {
        const formField = document.querySelector('.search-area');
        const sortBtn = formField.querySelector('.search-area__sort');
        const sortModal = formField.querySelector(".sortModal");
        const defaultBtn = sortModal.querySelector('.default');
        const ascBtn = sortModal.querySelector('.ascending');
        const desBtn = sortModal.querySelector('.descending');

        function toggleSortModal () {
            sortModal.classList.toggle('active');
        }
        sortBtn.addEventListener('click', toggleSortModal);

        function sortDefault () {
            desBtn.classList.remove('active');
            defaultBtn.classList.add('active');
            ascBtn.classList.remove('active');
            filter.setFilter('sort', 'default');             
        }
        defaultBtn.addEventListener('click', sortDefault);        

        function sortAsc () {
            desBtn.classList.remove('active');
            defaultBtn.classList.remove('active');
            ascBtn.classList.add('active');
            // const {value} = ;
            filter.setFilter('sort', 'ascending');  
        }
        ascBtn.addEventListener('click', sortAsc);

        function sortDes () {
            desBtn.classList.add('active');
            defaultBtn.classList.remove('active');
            ascBtn.classList.remove('active');
            filter.setFilter('sort', 'descending'); 
        }
        desBtn.addEventListener('click', sortDes);
    }
                    
}
// ___________________________________________________________________________________cart logic

class Cart {
    constructor() {
        this.items = [];
        this.name = 'Cart';
    }

    addToCart(item) {
        const id = item.id;
        const itemInCart = this.items.find(product => product.id === id);
        if (itemInCart) {
            if(itemInCart.amount < 4) {
                itemInCart.amount++;
            }
            return itemInCart;
        }
        const newItemInCart = {
            id,
            item,
            amount: 1,
        }
        return this.items.push(newItemInCart);
    }

    get totalAmount(){
        return this.items.reduce((acc, item) => {
            return acc + item.amount;
        }, 0)
    }
    

    get totalPrice(){
        return this.items.reduce((acc, item) => {
            return acc + item.amount * item.item.price;
        }, 0)
    }

    decreaseItem(item){
        const id = item.id;
        const itemInCart = this.items.find(product => product.id === id);
        if(itemInCart && itemInCart.amount >= 2) {
            itemInCart.amount--;
            
        }
    }

    removeItem(item){
        item.amount = 0;
        let result = this.items.filter(it => it.amount > 0);
        console.log(result);
        this.items = result;

        // cart counter
        const cartCounter = document.querySelector('.cart-btn_number-of-products');
        if(cart.totalAmount === 0) {
            cartCounter.classList.remove('active');
        }

        return cart.items;

    }
}
// _____________________________________________________________________-render cart
class RenderCart{
    constructor () {
        this.containerForCart = document.querySelector('.cart-container__product');
        this.renderCartProducts(cart.items);
        this.openModalWindowCart();
    }

    renderOneCartProduct (item){
        const cartProduct = document.createElement('div');
        cartProduct.className = 'cart-product';
        cartProduct.innerHTML = `
            <img class="cart-product-img" src="${item.item.imgUrl}" alt="${item.item.name}">
            <div class="cart-product-header">
                <h2 class="cart-product-header_main-header">${item.item.name}</h2>
                <h3 class="cart-product-header_second-header">${item.item.price} $</h3>
            </div>
            <div class="cart-product-buttons">
                <button class="cart-product_decrease-btn"></button>
                <p class="cart-product_amount">${item.amount}</p>
                <button class="cart-product_add-btn"></button>
                <button class="cart-product_remove-btn"><div class="cart-product_remove-btn_sign">sign</div></button>
            </div>
        `;
        // total amount
        const totalAmount = document.querySelector('.cart__section_bottom_total-amount');
        totalAmount.innerHTML = `Total amount: ${cart.totalAmount} ptc.`;

        // cart counter
        const cartCounter = document.querySelector('.cart-btn_number-of-products');
            if (cart.totalAmount > 0) {
                cartCounter.classList.add('active');
                cartCounter.innerHTML = `
                    <h3>${cart.totalAmount}</h3>
                `;
            } else if(cart.totalAmount === 0) {
                cartCounter.classList.remove('active');
            }

        // total price
        const totalPrice = document.querySelector('.cart__section_bottom_total-price');
        totalPrice.innerHTML = `Total price: ${cart.totalPrice}$`;

        // decrease
        const decreaseBtn = cartProduct.querySelector('.cart-product_decrease-btn');
        decreaseBtn.addEventListener ('click', () => {
            cart.decreaseItem(item); 
            renderCart.renderCartProducts(cart.items);
        });

        // add
        const addBtn = cartProduct.querySelector('.cart-product_add-btn');
        addBtn.addEventListener ('click', () => {
            cart.addToCart(item); 
            renderCart.renderCartProducts(cart.items);
        })

        // remove
        const removeBtn = cartProduct.querySelector('.cart-product_remove-btn');
        removeBtn.addEventListener ('click', () => {
            cart.removeItem(item); 
            renderCart.renderCartProducts(cart.items);
            totalAmount.innerHTML = `Total amount: ${cart.totalAmount} ptc.`;
            totalPrice.innerHTML = `Total price: ${cart.totalPrice}$`;
        })

        return cartProduct;    
    }

    // render all products

    renderCartProducts (items) {
        this.containerForCart.innerHTML = '';
        let products = items.map(item => {
            return this.renderOneCartProduct(item);
        })
        return this.containerForCart.append(...products);
    }

    // toggle cart
    openModalWindowCart () {
        const cartBtn = document.querySelector('.cart-btn');
        const cartWindow = document.querySelector('.cart-container');

        cartBtn.addEventListener('click', () => {
            cartWindow.classList.toggle('active');        
        })

    }

}
// ___________________________________________________________________________________slider

class Slider {
    constructor() {
        this.container = document.querySelector('.slider');
        this.sliderImg = document.querySelector('.slider-img');
        this.imgsUrl = ["banners/apple_tv_banner.png", "banners/air_pods_max_banner.jpg", "banners/airpods_pro_banner.png", "banners/ipad_air_banner.jpg", "banners/mac_book_banner.jpg", "banners/watch_banner.jpg"];
        this.renderSlider();

    }

    renderSlider(){       
        const delay = 10000;
        let currentIndex = 0;
        const imgLinks = this.imgsUrl;
        const img = this.sliderImg;

        setInterval(function() {
            img.src = imgLinks[currentIndex];
            currentIndex++;
            if(currentIndex >= imgLinks.length) {
                currentIndex = 0;
            }
        }, delay);
    }
}



const itemsList = new ItemsList;

const cart = new Cart;

const renderCart = new RenderCart(cart);
 
const renderCards = new RenderCards(itemsList, cart, renderCart);


const filter = new Filter(itemsList, renderCards);

const renderFilter = new RenderFilters(itemsList, filter);

const slider = new Slider();

// setInterval(slider.render(), 1000);


// console.log(itemsList.availableColors) 
// console.log(itemsList.availableStorage) 
// console.log(itemsList.availableOs) 
// console.log(itemsList.availableDisplayBetween) 
// console.log(renderFilter.filterOptions) 
// console.log(filter)
