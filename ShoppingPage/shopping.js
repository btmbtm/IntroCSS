var teaDisplay = document.querySelector("#teaProductDisplay");
var discounts = []
var cart = document.querySelector(".cart");
var cartTable = document.querySelector(".cartTable tbody");
var cartTotalValue = document.getElementById("cartTotalValue");
var cartTotalItems = document.getElementById("cartTotalItems");
var closeCartBtn = document.getElementById("closeCartBtn");
var cartToggle = document.getElementById("cartToggle");
var continueShoppingBtn = document.getElementById("continueShoppingBtn");
var applyCouponCodeBtn = document.getElementById("applyCouponCodeBtn");
var applyCouponCodeInput = document.getElementById("applyCouponCodeInput");
var cartItemsNumber = document.getElementById("cartItemsNumber");
var currentlyAppliedDisCode = document.getElementById("currentlyAppliedDisCode");
var currentCouponCode;

closeCartBtn.addEventListener("click", hideCart);
continueShoppingBtn.addEventListener("click", hideCart);
cartToggle.addEventListener("click", toggleCart);
applyCouponCodeBtn.addEventListener("click", testAndApplyCouponCode);

cartTotalValue.innerHTML = "$0.00";
cartTotalItems.innerHTML = 0;

var cartCurrentItems = [];
hideCart();

function toggleCart() {
    if (cart.style.display === "none") {
        showCart()
    } else {
        hideCart();
    }
}

function hideCart() {
    cart.style.display = "none";
}

function showCart() {
    cart.style.display = "block";
    window.scrollTo(0, 0);
}

function updateCart() {
    cartTable.innerHTML = "";
    var totalCost = 0;
    var totalItems = 0;
    for (var i = 0; i < cartCurrentItems.length; i++) {
        cartTable.appendChild(cartCurrentItems[i].cartItemDisplay);

        totalCost += cartCurrentItems[i].cartItemCost * cartCurrentItems[i].quantity;
        totalItems += Number(cartCurrentItems[i].quantity);
    }
    cartTotalItems.innerHTML = totalItems;
    cartTotalValue.innerHTML = "$" + totalCost.toFixed(2);
    // if(totalItems < 1){
    //     hideCart();
    // } else {
    //    
    // }
    applyCouponCode(currentCouponCode);
    cartItemsNumber.innerHTML = " " +totalItems;
    showCart();
}

function calculateTotalCost() {
    var totalCost = 0;
    for (var i = 0; i < cartCurrentItems.length; i++) {
        totalCost += cartCurrentItems[i].cartItemCost * cartCurrentItems[i].quantity;
    }
    return totalCost;
}

function addItemToCart(cartItem) {
    return function() {
        if (cartCurrentItems.indexOf(cartItem) < 0) {
            cartItem.quantity = 1;
            cartItem.updateCartItemDisplay();
            cartCurrentItems.push(cartItem);
        } else {
            cartItem.quantity += 1;
            cartItem.updateCartItemDisplay();
        }
        cartTable.innerHTML = "";
        updateCart();
    };
}

function removeItemFromCart(cartItem) {
    return function() {
        cartItem.quantity = 0;
        cartItem.updateCartItemDisplay();
        if (cartCurrentItems.indexOf(cartItem) >= 0) {

            cartCurrentItems.splice(cartCurrentItems.indexOf(cartItem), 1);
        }
        cartTable.innerHTML = "";
        updateCart();
    };
}

function updateCartItemQuantity(cartItem) {
    return function() {
        if (Number(this.value) === 0) {
            cartItem.removeThisItemFromCart();
        } else {
            cartItem.quantity = this.value;
            cartItem.updateCartItemDisplay();
            updateCart();
        }
    };
}




function discountCode(code, discount, willAffectProperty, willAffectValue) {
    this.code = code;
    this.multiplier = (100 - discount) / 100;
    this.willAffectProperty = willAffectProperty;
    this.willAffectValue = willAffectValue;
}

var anji10 = new discountCode("anji10", 10, "name", "Anji Baicha");
var green15 = new discountCode("green15", 15, "type", "Green");
var total5 = new discountCode("total5", 5, "cartTotal", "");

var couponCodes = [anji10, green15, total5];

function testAndApplyCouponCode() {
    if(currentCouponCode && applyCouponCodeInput.value === currentCouponCode.code){
        alert(currentCouponCode.code + "IS ALREADY APPLIED");
        return;
    }

    for (var i = 0; i < couponCodes.length; i++) {
        if (applyCouponCodeInput.value === couponCodes[i].code) {
            if (testCouponCode(couponCodes[i]) > testCouponCode(currentCouponCode)) {
                alert(couponCodes[i].code + " does not provide more savings!") ;
                break;
            }


            applyCouponCode(couponCodes[i]);
            currentCouponCode = couponCodes[i];
            applyCouponCodeInput.value = "";
            currentlyAppliedDisCode.innerHTML = currentCouponCode.code + " APPLIED";
            break;
        }
    }

    updateCart();
}



function testCouponCode(couponCode) {
    if (!couponCode) return;
    var total = 0;
    for (var j = 0; j < cartCurrentItems.length; j++) {
        if (couponCode.willAffectProperty === "cartTotal" || cartCurrentItems[j].item[couponCode.willAffectProperty] === couponCode.willAffectValue) {
            total += cartCurrentItems[j].item.cost * couponCode.multiplier * cartCurrentItems[j].quantity;
        } else {
            total += cartCurrentItems[j].item.cost * cartCurrentItems[j].quantity;
        }
    }
    return total;
}


function applyCouponCode(couponCode) {
    if (!couponCode) return;

    var total = 0;
    for (var j = 0; j < cartCurrentItems.length; j++) {
        if (couponCode.willAffectProperty === "cartTotal" || cartCurrentItems[j].item[couponCode.willAffectProperty] === couponCode.willAffectValue) {
            cartCurrentItems[j].cartItemCost = cartCurrentItems[j].item.cost * couponCode.multiplier;
            cartCurrentItems[j].isDiscounted = true;
            cartCurrentItems[j].updateCartItemDisplay();
        } else {

            cartCurrentItems[j].cartItemCost = cartCurrentItems[j].item.cost;
            cartCurrentItems[j].isDiscounted = false;
            cartCurrentItems[j].updateCartItemDisplay();
        }
    }
}








function CartItem(item, quantity) {
    this.item = item;
    this.quantity = quantity;
    this.cartItemCost = this.item.cost;
    this.cartItemDisplay = document.createElement("TR");
    this.cartItemTotalCost = this.cartItemCost * this.quanity;
    this.isDiscounted = false;

    var totalItemCost = "$" + (Number(this.quanity) * Number(this.item.cost));
    var cartNumberTD = document.createElement("TD");
    var cartItemQuantityNum = document.createElement("INPUT");
    cartItemQuantityNum.type = "number";
    cartItemQuantityNum.className = "quant";
    cartItemQuantityNum.value = this.quantity;
    cartItemQuantityNum.min = 0;
    cartItemQuantityNum.max = 99;
    var updateCartItemQuantityFcn = updateCartItemQuantity(this);
    cartItemQuantityNum.addEventListener("change", updateCartItemQuantityFcn);
    cartNumberTD.appendChild(cartItemQuantityNum);

    var removeItemBtn = document.createElement("TD");
    removeItemBtn.innerHTML = '<button class="removeItemBtn"><i class="fa fa-times" aria-hidden="true"></button>';
    this.removeThisItemFromCart = removeItemFromCart(this);
    removeItemBtn.addEventListener("click", this.removeThisItemFromCart);

    this.cartItemDisplay.innerHTML = '<td class="imgCell"> <img src="' + this.item.imageLoc + '" /> </td> <td class="productName"> ' + this.item.name + ' </td> <td> ' + this.quantity + '</td>';

    this.cartItemDisplay.appendChild(cartNumberTD);
    this.cartItemDisplay.appendChild(removeItemBtn);

    this.updateCartItemDisplay = function() {
        this.cartItemDisplay.innerHTML = '<td class="imgCell"> <img src="' + this.item.imageLoc + '" /> </td> <td class="productName"> ' + this.item.name + ' </td> <td> ' + "$" + (this.quantity * this.cartItemCost).toFixed(2) + '</td>';
        cartItemQuantityNum.value = this.quantity;
        if (this.isDiscounted) { 
            this.cartItemDisplay.style.color = "green"; 
        } else { 
            this.cartItemDisplay.style.color = ""; 
        }

        this.cartItemDisplay.appendChild(cartNumberTD);
        this.cartItemDisplay.appendChild(removeItemBtn);
    };
}



function Product(name, type, cost, year, loc, imageLoc) {
    this.name = name;
    this.type = type;
    this.cost = cost;
    this.year = year;
    this.loc = loc;
    this.imageLoc = imageLoc;
    this.dollarCost = "$" + cost.toFixed(2);
    this.addItemBtnId = "add" + name.replace(/ /g, '') + "Btn";
    this.shopDisplayNodeAddCartBtn = document.createElement("BUTTON");
    this.shopDisplayNodeAddCartBtn.className = "add";
    this.shopDisplayNodeAddCartBtn.innerHTML = " Add to Cart";
    var addToCartFcn = addItemToCart(new CartItem(this, 1));
    this.shopDisplayNodeAddCartBtn.addEventListener("click", addToCartFcn);
    this.shopDisplayNode = document.createElement("DIV");
    this.shopDisplayNode.className = "product";
    this.shopDisplayNode.innerHTML = '<img src="' + this.imageLoc + '" /> <div class="description"> <h2 class="title">' + this.name + '</h2> <p> ' + year + ', ' + this.loc + '</p> <h3> ' + this.dollarCost + ' / 1 lb </h3>';
    this.shopDisplayNode.appendChild(this.shopDisplayNodeAddCartBtn);
}



var placeHolderImg = "http://placehold.it/350x350";

//Green Teas
var greeanTeaHeader = document.createElement("H2");
greeanTeaHeader.innerHTML = "Green Teas";
teaDisplay.appendChild(greeanTeaHeader);

var anjiBaicha = new Product("Anji Baicha", "Green", 50, 2016, "China", placeHolderImg);
teaDisplay.appendChild(anjiBaicha.shopDisplayNode);

var dragonWell = new Product("Dragon Well", "Green", 100, 2016, "China", placeHolderImg);
teaDisplay.appendChild(dragonWell.shopDisplayNode);

var hojicha = new Product("Hojicha", "Green", 30, 2016, "Japan", placeHolderImg);
teaDisplay.appendChild(hojicha.shopDisplayNode);

var sencha = new Product("Sencha", "Green", 20, 2016, "Japan", placeHolderImg);
teaDisplay.appendChild(sencha.shopDisplayNode);

var gyokuro = new Product("Gyokuro", "Green", 70, 2016, "Japan", placeHolderImg);
teaDisplay.appendChild(gyokuro.shopDisplayNode);


//Black Teas
var blackTeaHeader = document.createElement("H2");
blackTeaHeader.innerHTML = "Black Teas";
teaDisplay.appendChild(blackTeaHeader);

var ceylon = new Product("Ceylon", "Black", 15, 2016, "Sri Lanka", placeHolderImg);
teaDisplay.appendChild(ceylon.shopDisplayNode);

var darjeeling = new Product("Darjeeling", "Black", 15, 2016, "India", placeHolderImg);
teaDisplay.appendChild(darjeeling.shopDisplayNode);

var maoFeng = new Product("Mao Feng", "Black", 25, 2016, "China", placeHolderImg);
teaDisplay.appendChild(maoFeng.shopDisplayNode);


//White Teas

var whiteTeaHeader = document.createElement("H2");
whiteTeaHeader.innerHTML = "White Teas";
teaDisplay.appendChild(whiteTeaHeader);

var silverNeedle = new Product("Silver Needle", "White", 35, 2016, "China", placeHolderImg);

teaDisplay.appendChild(silverNeedle.shopDisplayNode);

var whitePeony = new Product("White Peony", "White", 35, 2016, "China", placeHolderImg);

teaDisplay.appendChild(whitePeony.shopDisplayNode);