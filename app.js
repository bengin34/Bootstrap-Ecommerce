
const taxRate = 0.18;
const shippingPrice = 30;
const shippingFreePrice = 1000;

// stock details
const stockHighHeel = 20;
const stockSlowish = 2;
const stockComfortBlack = 12;
const stockFlatlayPink = 9;
const stockSneakWhite = 5;
const stockProudBrown = 4;
const stockTraveller = 6;
const stockBullyWhiteBlack = 8;

//! boş array oluşturdum üstteki shopping için
let ShoppingCart = JSON.parse(localStorage.getItem("ShoppingCart")) || [];

//!local storage a ekleme ama şu an kullanmadım
window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);
  localStorage.setItem("stockHighHeel", stockHighHeel);
  localStorage.setItem("stockSlowish ", stockSlowish);
  localStorage.setItem("stockComfortBlack", stockComfortBlack);
  localStorage.setItem("stockFlatlayPink", stockFlatlayPink);
  localStorage.setItem("stockSneakWhite", stockSneakWhite);
  localStorage.setItem("stockProudBrown", stockProudBrown);
  localStorage.setItem("stockTraveller", stockTraveller);
  localStorage.setItem("stockBullyWhiteBlack", stockBullyWhiteBlack);
  getShoppingCartFromLocalStorage();
});

//! şu an kullanmıyorum
const getShoppingCartFromLocalStorage = () => {};


// Get the shopping bag icon
let shoppingBag = document.querySelector(".fa-shopping-bag");


// Get the cart container
let cartContainer = document.querySelector(".cart-container");
let cartItemsContainer = document.querySelector(".cart-item");
const containerDiv = document.querySelector(".container");


//! div içerisinde alışveriş butonuna basıldığında

containerDiv.addEventListener("click", (e) => {
  if (e.target.className == "fas fa-shopping-bag fa-2x") {
    let product = e.target.closest(".product");
    let productName = product.nextElementSibling.nextElementSibling.innerText;
    let img = product.querySelector("img");
    let imgSrc = img.src;
    let productPrice =
      product.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.querySelector(
        ".price"
      ).innerText;
    let cartItem = document.createElement("div");
    cartItem.classList.add("item-info");
    cartItem.innerHTML = `
        <img class="cartImg " src="${imgSrc}" alt="">
        <h4 d-6 class="cartProductName">${productName}</h4>
        <h4 d-6 >$<span class="cartProductPrice">${productPrice}</span></h4> 
        <button class="btn btn-outline-warning minus" >-</button>
        <span class="number">1</span>
        <button class="btn btn-outline-warning plus" >+</button>
        <button class="btn btn-danger btn-remove">Remove</button>
        `;

        //! array e yeni ıtem ekleme
    const buyItem = {
      id: new Date().getTime(),
      name: `${productName}`,
      price: ` ${productPrice}`,
    };
    //! mevcut ürün kontrolü için 
    const existingProduct = ShoppingCart.some(
      (product) => product.name === productName
    );

    if (cartContainer.style.display === "none") {
      cartContainer.style.display = "block";
      ShoppingCart.push(buyItem);
      cartItemsContainer.appendChild(cartItem);
    } else {
      // //! find the existing cart item   aynı eleman varsa gönderme
      if (!existingProduct) {
        ShoppingCart.push(buyItem);
        cartItemsContainer.appendChild(cartItem);
      } else {
        alert(`${productName} already exists in the cart.`);
      }
    }
    //!!!! ekleme butonuna basılırsa
  } else if (e.target.className == "btn btn-outline-warning plus") {
    let productAmount = e.target.closest(".item-info").querySelector(".number");
    let cartProductPrice = e.target
      .closest(".item-info")
      .querySelector(".cartProductPrice");
    productAmount.innerText++;
    cartProductPrice.innerText =
      cartProductPrice.innerText * productAmount.innerText;
    console.log(productAmount.innerText);
  }
  //! azaltma butonuna basılırsa
  else if (e.target.className == "btn btn-outline-warning minus") {
    let productAmount = e.target.closest(".item-info").querySelector(".number");
    if (productAmount.innerText > 1) {
      productAmount.innerText--;

      let cartProductPrice = e.target
        .closest(".item-info")
        .querySelector(".cartProductPrice");
      cartProductPrice.innerText =
        cartProductPrice.innerText * productAmount.innerText;
    } else {
      if (confirm("Do you want to remove?")) {
        e.target.closest(".item-info").remove();
      }
    }
  }
  //!! remove butonuna basılırsa
  else if (e.target.className == "btn btn-danger btn-remove") {
    if (confirm("Do you want to remove?")) {
      e.target.closest(".item-info").remove();
    }
  }
});
