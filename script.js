function openCart(){

document
.getElementById("cartDrawer")
.classList.add("active");

}

function closeCart(){

document
.getElementById("cartDrawer")
.classList.remove("active");

}

let cart = [];

function addToCart(
name,
price,
image
){

cart.push({

name,
price,
image

});

document
.getElementById("cartCount")
.innerText = cart.length;

renderCart();

}

function renderCart(){

let cartItems =
document.getElementById(
"cartItems"
);

cartItems.innerHTML = "";

cart.forEach(item=>{

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<h3>${item.name}</h3>

<p>Rs ${item.price}</p>

</div>

`;

});

}
