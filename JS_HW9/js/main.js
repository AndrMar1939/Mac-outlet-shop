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

    findByName(nameOfItem) {
        return this.items.filter(item => item.name.toLowerCase().includes(nameOfItem.toLowerCase()));
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
            // btn addToCart style
            if (item.orderInfo.inStock === 0) {
                btn.classList.add("empty");
                btn.disabled = true;   
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
// ______________________________________________________________________accordion toggle animation______________________________________________


class AccordionAnimation {
    constructor(){
        this.accordionBtn = document.querySelectorAll('.accordion-btn');
        this.toggleAnimation();
    }

    toggleAnimation () {
        this.accordionBtn.forEach(element => 
        element.addEventListener('click', () => {
            const accordionContent = element.nextElementSibling;
            const arrowBtn = element.querySelector('.accordion-btn__arrow')

            
            element.classList.toggle('active');
            accordionContent.classList.toggle('active');
            arrowBtn.classList.toggle('active');
            }))
    }
}



const itemsList = new ItemsList;
 
const renderCards = new RenderCards(itemsList);


const accordionToggleAnimation = new AccordionAnimation;    
