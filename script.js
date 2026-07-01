script.js

/* =========================
   GIFT WALLAY PREMIUM JS
========================= */

/* CART SYSTEM */

let cart = JSON.parse(
localStorage.getItem("giftwallay_cart")
) || [];

updateCartCount();

/* OPEN CART */

function openCart(){

document
.getElementById("cartDrawer")
.classList.add("active");

}

/* CLOSE CART */

function closeCart(){

document
.getElementById("cartDrawer")
.classList.remove("active");

}

/* ADD TO CART */

function addToCart(
name,
price,
image
){

let product = {

name:name,

price:price,

image:image,

qty:1

};

cart.push(product);

localStorage.setItem(
"giftwallay_cart",
JSON.stringify(cart)
);

updateCartCount();

renderCart();

showPopup(
name + " Added To Cart"
);

}

/* UPDATE CART COUNT */

function updateCartCount(){

document
.getElementById("cartCount")
.innerText = cart.length;

}

/* RENDER CART */

function renderCart(){

let cartItems =
document.getElementById(
"cartItems"
);

let total = 0;

cartItems.innerHTML = "";

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}">

<div>

<h3>${item.name}</h3>

<p>
Rs ${item.price}
</p>

<div class="qty-box">

<button
onclick="decreaseQty(${index})">

-

</button>

<span>
${item.qty}
</span>

<button
onclick="increaseQty(${index})">

+

</button>

</div>

</div>

<button
class="remove-btn"
onclick="removeItem(${index})">

✕

</button>

</div>

`;

});

document
.getElementById("cartTotal")
.innerText =
"Rs " + total;

}

/* REMOVE ITEM */

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"giftwallay_cart",
JSON.stringify(cart)
);

renderCart();

updateCartCount();

}

/* INCREASE QTY */

function increaseQty(index){

cart[index].qty++;

cart[index].price =
cart[index].price;

localStorage.setItem(
"giftwallay_cart",
JSON.stringify(cart)
);

renderCart();

}

/* DECREASE QTY */

function decreaseQty(index){

if(cart[index].qty > 1){

cart[index].qty--;

}

localStorage.setItem(
"giftwallay_cart",
JSON.stringify(cart)
);

renderCart();

}

/* POPUP */

function showPopup(message){

let popup =
document.createElement("div");

popup.classList.add("popup");

popup.innerText = message;

document.body.appendChild(popup);

setTimeout(()=>{

popup.classList.add("show");

},100);

setTimeout(()=>{

popup.remove();

},3000);

}

/* OTP SYSTEM */

function sendOTP(){

let email =
document.getElementById("email")
.value;

let otp =
Math.floor(
100000 +
Math.random()*900000
);

localStorage.setItem(
"giftwallay_otp",
otp
);

/* EMAILJS */

emailjs.send(

"SERVICE_ID",

"TEMPLATE_ID",

{

to_email:email,

otp_code:otp

}

)

.then(()=>{

showPopup(
"OTP Sent Successfully"
);

});

}

/* VERIFY OTP */

function verifyOTP(){

let enteredOTP =
document.getElementById("otp")
.value;

let savedOTP =
localStorage.getItem(
"giftwallay_otp"
);

if(enteredOTP == savedOTP){

showPopup(
"Account Verified"
);

window.location =
"account.html";

}else{

showPopup(
"Wrong OTP"
);

}

}

/* REVIEW SYSTEM */

function submitReview(){

let name =
document
.getElementById("reviewName")
.value;

let review =
document
.getElementById("reviewText")
.value;

let reviews =
JSON.parse(
localStorage.getItem(
"giftwallay_reviews"
)
) || [];

reviews.push({

name:name,

review:review

});

localStorage.setItem(
"giftwallay_reviews",
JSON.stringify(reviews)
);

loadReviews();

showPopup(
"Review Submitted"
);

}

/* LOAD REVIEWS */

function loadReviews(){

let container =
document.getElementById(
"reviewsContainer"
);

if(!container) return;

let reviews =
JSON.parse(
localStorage.getItem(
"giftwallay_reviews"
)
) || [];

container.innerHTML = "";

reviews.forEach(review=>{

container.innerHTML += `

<div class="review-card">

<h3>
${review.name}
</h3>

<p>
⭐⭐⭐⭐⭐
</p>

<p>
${review.review}
</p>

</div>

`;

});

}

loadReviews();

/* PREMIUM SCROLL EFFECT */

window.addEventListener(
"scroll",
()=>{

let navbar =
document.querySelector(
".navbar"
);

if(window.scrollY > 50){

navbar.classList.add(
"scrolled"
);

}else{

navbar.classList.remove(
"scrolled"
);

}

}
);

/* SEARCH */

function searchProducts(){

let input =
document.getElementById(
"searchInput"
).value.toLowerCase();

let cards =
document.querySelectorAll(
".product-card"
);

cards.forEach(card=>{

let title =
card.querySelector("h3")
.innerText.toLowerCase();

if(title.includes(input)){

card.style.display =
"block";

}else{

card.style.display =
"none";

}

});

}

/* AUTO OPEN CART */

renderCart();
