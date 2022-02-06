// ensures page load before looking for elements
if (document.readyState == "loading"    ) {
    document.addEventListener("DOMContentLoaded", start)
} else {
    start()
}

// Main method, adds event listeners to all clickable/changable elements on page startup.
function start() {
    // Making an array of all the remove from cart buttons
    var  removeFromCart = document.getElementsByClassName("btn_remove");
    // Iterating through the array to assign event listeners to each button (click listener)
for (var i=0;i<removeFromCart.length;i++) {
    var button = removeFromCart[i]
    button.addEventListener("click" , removeItemFromCart)
    }
    // Making an array of all the quantity input boxes
    var quantitySlider = document.getElementsByClassName("cart_item_quantity")
    // Iterating through the array to assign event listeners to each input (change listener)
for (var i=0;i<quantitySlider.length;i++) {
    var currentVal = quantitySlider[i]
    currentVal.addEventListener("change" , quantityChange)
}
// Making an array of all the add to  cart buttons
var addToCartButtons = document.getElementsByClassName("btn_add_to_cart")
// Iterating through the array to assign event listeners to each input (click listener)
for (var i=0;i<addToCartButtons.length;i++) {
    var input = addToCartButtons[i]
    input.addEventListener("click" , addToCartClick )

}
}
// Updates cart when quantity is changed
function quantityChange(event) {
        var currentVal = event.target
        // Checks if the value is not a number or below 0 and sets it to one if it is
        if (isNaN(currentVal.value) || currentVal.value <= 0) {
            currentVal.value  = 1;
        } 
        updateCart()
}

// Removes an item from the cart
function removeItemFromCart(event) {   
    var buttonClicked = event.target
    // grabs the parent element which in this case is the table row and deletes it and calls update cart
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateCart()
 

}
//  Updates the price on the total 
function updateCart() {
    //  grabs the cart container
    var cartItemCont = document.getElementsByClassName("cart_items")[0]
    // takes an array of the cart elements in the cart
    var cartRows = cartItemCont.getElementsByClassName("cart_row")
    var totalCost = 0

    // Iterates through all the cart elements, taking the price and quanity and updating the subtotal cost and total cost

for (var i=0;i<cartRows.length;i++) {
    var cartRow = cartRows[i]
    var priceEle = cartRow.getElementsByClassName("cart_item_price")[0]
    var quantityEle = cartRow.getElementsByClassName("cart_item_quantity")[0]
    var subTotalEle = cartRow.getElementsByClassName("product_sub_price")[0]
    var price = parseFloat(priceEle.innerHTML.replace("$" , ""))
    var quantity = quantityEle.value
    totalCost += (price * quantity)
    subTotalEle.innerHTML = "$" + price*quantity


}
document.getElementsByClassName("cart_total_price")[0].innerHTML = "$" + totalCost;
}


//  on click it takes the parent element of the button clicked and extracts the price,quantity and img source and sends em to the add to cart method
function addToCartClick(event) {
    var button = event.target
    var shopItem = button.parentElement
    var productName = shopItem.getElementsByClassName("product_name")[0].innerHTML
    var productImgSrc = shopItem.getElementsByClassName("item_img")[0].src
    var productPrice  = shopItem.getElementsByClassName("product_price")[0].innerHTML
    addItemToCart(productName, productPrice , productImgSrc)
    updateCart()
    


}

//  Adds an element to the cart given its parameters 
function addItemToCart(productName, productPrice , productImgSrc) {

    // Pulls the table section that contains cart objects into an object
    var tbodyRef = document.getElementsByClassName("table_ref")[0].getElementsByClassName("cart_items")[0]
    // Creates a new row in that table section
    var newRow = tbodyRef.insertRow(0)
    // Adds a class to the row
    newRow.className = "cart_row"

    //  Checking the cart to see if items already there
    var cartProducts = document.getElementsByClassName("cart_items")[0]
    var cartProductNames =cartProducts.getElementsByClassName("cart_product_name")

    for (var i=0 ; i < cartProductNames.length; i++) {
        if (cartProductNames[i].innerText == productName) {
            alert("Item is already in cart")
            cartProducts.getElementsByClassName("cart_row")[0].remove()
            return
        }
    }


    // Template for each item in the cart, values are passed in, this works
    var cellContent = `
        <td>
        <div class="cart_info"><img src="${productImgSrc}" alt=""></div>
        <div>
            <p class="cart_product_name">${productName}</p>
            <small>Price: </small>
            <small class="cart_item_price">${productPrice}</small>
            <br>
            <button class="btn_remove">remove</button
        </div>
    </td>
    <td><input class="cart_item_quantity" type="number" value="1" ></td>
    <td class="product_sub_price">${productPrice}</td>
    `
    // Adds the template to the row
    newRow.innerHTML = cellContent
    // SUpposed to add a listener to the remove button so it works but its broken
    newRow.getElementsByClassName("btn_remove")[0].addEventListener("click" , removeItemFromCart)
    newRow.getElementsByClassName("cart_item_quantity")[0].addEventListener("click" , quantityChange)
    

}



// Form stuff
const form = document.getElementsByClassName("formin")[0]
const fName = document.getElementById("fName")
const lName = document.getElementById("lName")
const telephone = document.getElementById("telephone")
const email = document.getElementById("email")

function emptyCart() {
    var itemsInCart = document.getElementsByClassName("btn_remove")
    console.log(itemsInCart)
    for (var i=0; i<itemsInCart.length;i++) {
    console.log(itemsInCart[i])
       itemsInCart[i].parentElement.parentElement.parentElement.remove()
       
    }
    if (itemsInCart.length>0) {
        itemsInCart[0].parentElement.parentElement.parentElement.remove()
    }
    updateCart()
    console.log(itemsInCart)
}

form.addEventListener("reset" , emptyCart)

form.addEventListener("submit" , (e) => {
    e.preventDefault()
    let messages = []
    if (fName.value === "" || fName.value == null) {
        messages.push('First name is required.')
    }
    if (lName.value === "" || lName.value == null) {
        messages.push('Last name is required.')
    }
    if (email.value === "" || email.value == null) {
        messages.push('Email is required.')
    }
    if ( telephone.value === "" || telephone.value == null) {
        messages.push('Telephone number is required.')
    }


    e.preventDefault()
    
    var productLister = document.getElementsByClassName("cart_product_name")
    
    var productString = ""
    for (var i=0 ; i < productLister.length ; i++) {
        productString += `Product ${i+1} : ${productLister[i].innerText}. \n`

    }
    var totalCost = document.getElementsByClassName("cart_total_price")[0].innerText
    
    
    
    if (totalCost == "$0" ) {
        messages.push('Cart is empty.')
    }
    console.log(messages)
    if (messages.length > 0) {

        var text = ""
        for (var i=0 ; i < messages.length ; i++) {
            text += messages[i] + "\n"

        }
        alert(text)
        
    }
    else {
        alert("Invoice Details:" +
        "\nName: " + fName.value + " " + lName.value +
        "\nEmail: " + email.value +
        "\n--------------------------\n" + productString +
        "\nTotal Cost = " + totalCost +
        "\n\nThank you for shopping at the ArtCorner")
        setTimeout(() => {  console.log(""); }, 2000);
        location.reload();
    }
    
    
    
})