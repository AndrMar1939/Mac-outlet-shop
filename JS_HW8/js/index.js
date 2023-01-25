const containerForCards = document.querySelector('.container-for-cards');

// declared variable for max number of items in the store and calculating the quantity of orders  
const maxAmountOfItems = 1333;




// render ONE card function

const renderCard = (item) => {

    // define orders info and add coma to orders info number
    function calculationOrdersNumber (item) {
        let result = 0;
        let num = maxAmountOfItems - item.orderInfo.inStock + '';
        let num2 = null;
        
        if (num.length > 3) {
            num2 = num.split('');
            num2.splice(-3, 0, ",")
            result = num2.join('');
        } else {result = num};

        return result;
  
    }
    const ordersNumber = calculationOrdersNumber(item);
    
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
                <p class="product-orders">${ordersNumber}</p>
                <p>orders</p>
            </div>
        </div>     
    `;

    // create dynamic variables from product card
    let stockStatus = productCard.querySelector(".product-stock-status");
    let btnAddToCart = productCard.querySelector('.product-card__btn');
    let likeOfProduct = productCard.querySelector(".product-like");
   
    if (item.orderInfo.inStock === 0) {
        stockStatus.classList.add("empty");
        btnAddToCart.classList.add("empty");
        btnAddToCart.disabled = true;   
    }

    // event click for like button

    let counterOfClicks = 1;

    likeOfProduct.onclick = function (event) {
        counterOfClicks++;
        event.stopPropagation();
        likeOfProduct.classList.toggle('active'); 

        if (counterOfClicks % 2 === 0) {
            item.favorite = true;
        } else {
            delete item.favorite; 
        }    
    }
   
    return productCard;
}


// render ALL cards function

const renderCards = (items) => {
    const cardsCollection = items.map(renderCard);
    return containerForCards.append(...cardsCollection);
}
renderCards(items);





