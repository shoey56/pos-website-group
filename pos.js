window.addEventListener("load", (event) => {
  //Set year min and max for age validation
  document.getElementById("year").max = new Date().getFullYear();
  document.getElementById("year").min = new Date().getFullYear() - 100;
  currentMonth = new Date().getMonth();
  currentDate = new Date().getDate();
  //verify age
  document.getElementById("nameSubmit").addEventListener("click", over21);
  function over21(event) {
    selectedMonth = document.getElementById("month").value;
    selectedDay = document.getElementById("day").value;
    event.preventDefault();
    if (
      document.getElementById("year").value <
      document.getElementById("year").max - 21
    ) {
      document.getElementById("ageBackground").style.display = "none";
    } else if (
      selectedMonth < currentMonth ||
      (selectedMonth == currentMonth && selectedDay <= currentDate)
    ) {
      document.getElementById("ageBackground").style.display = "none";
    } else {
      alert("You must be 21 to access this site");
    }
  }
});

const checkoutButton = document.getElementById("checkout-pay");
checkoutButton.addEventListener("click", function (event) {
  const checkout = document.querySelector(".checkout");
  checkout.classList.toggle("hidden");
  const cartPage = document.querySelector(".cartPage");
  cartPage.classList.toggle("hidden");

  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');
  console.log(tabs);

  // Add a click event handler to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
  });

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener("keydown", (e) => {
    // Move right
    if (e.keyCode === 39 || e.keyCode === 37) {
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (e.keyCode === 39) {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.keyCode === 37) {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  });
});
function changeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;

  // Remove all current selected tabs
  parent
    .querySelectorAll('[aria-selected="true"]')
    .forEach((t) => t.setAttribute("aria-selected", false));

  // Set this tab as selected
  target.setAttribute("aria-selected", true);

  // Hide all tab panels
  grandparent
    .querySelectorAll('[role="tabpanel"]')
    .forEach((p) => p.setAttribute("hidden", true));

  // Show the selected panel
  grandparent.parentNode
    .querySelector(`#${target.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}

// Add to Cart
let cart = [];
// Calculate total
let subTotal = 0;
let tax = 0;
let total = 0;

document.getElementById("open-cart").addEventListener("click", loadCartPage);

function loadCartPage() {
  const cartPage = document.querySelector(".cartPage");
  const menuMessage = document.querySelector(".wine-intro");
  const hideMenu = document.querySelector(".main");
  menuMessage.classList.toggle("hidden")
  hideMenu.classList.toggle("hidden");
  cartPage.classList.toggle("hidden");
  let cartTable = document.getElementById("itemsInCart");
  let receiptTable = document.getElementById("itemsInReceipt");
  if (cart.length < 1) {
    alert("There are currently no items in your cart")
    menuMessage.classList.toggle("hidden")
    hideMenu.classList.toggle("hidden");
    cartPage.classList.toggle("hidden");
  } else {
    // cart.for(addItemToTable);
    for (let i = 0; i<cart.length; i++){
      addItemToTable(cart[i], i);
    }
    // cart.forEach(addItemToReceipt);
    calculateTotal();
    document.getElementById("open-cart").removeEventListener("click", loadCartPage);
  }  


  function addItemToTable(item, index) {
    if (!item.cart) {
      let newRow = cartTable.insertRow(-1);
      let newItem = newRow.insertCell(0);
      let newQty = newRow.insertCell(1);
      let newPrice = newRow.insertCell(2);
      let remove = newRow.insertCell(3);
      let image = document.createElement("img");
      image.classList.add("cartPicture");
      image.src = item.src;
      newItem.appendChild(image);
      let name = document.createElement("div");
      name.innerText = item.name;
      newItem.appendChild(name);
      let qty = document.createElement("div");
      qty.innerText = item.qty;
      newQty.appendChild(qty);
      let price = document.createElement("div");
      price.innerText = item.price;
      newPrice.appendChild(price);
      let removeFromCart = document.createElement("button");
      removeFromCart.innerText = "remove";
      removeFromCart.onclick = removeItem.bind(this, index);
      remove.appendChild(removeFromCart);
      item.cart = true;
    }
  }

  function removeItem(index, event) {
    event.preventDefault();
    console.log(event);
    let removeQty = event.path[2].children[1].innerText;
    console.log(removeQty)
    event.path[2].remove();
    cart.splice(index, 1);
    calculateTotal();
    let c = document.getElementById("open-cart"); 
    let currentCart = c.innerText;
    let ccartArray = currentCart.split(" ");
    let newQty = ccartArray[2] - removeQty;
    ccartArray[2] = newQty;
    let newCart = ccartArray.join(" ");
    c.innerText = newCart;

  }

  function addItemToReceipt(item) {
    if (item.cart) {
      console.log(item);
      let newRow = receiptTable.insertRow(-1);
      let newItem = newRow.insertCell(0);
      let newQty = newRow.insertCell(1);
      let name = document.createElement("div");
      name.innerText = item.name;
      newItem.appendChild(name);
      let qty = document.createElement("div");
      qty.innerText = item.qty;
      newQty.appendChild(qty);
    }
  }

  function calculateTotal() {
    subTotal = 0;
    tax = 0;
    total = 0;
    // let receiptTable = document.getElementById("itemsInReceipt");
    let cartTable = document.getElementById("itemsInCart");
    let rows = cartTable.querySelectorAll("tr");
    for (r = 1; r < rows.length; r++) {
      let rowData = rows[r].querySelectorAll("td");
      rQty = rowData[1].innerText;
      rPrice = rowData[2].innerText;
      subTotal = subTotal + rQty * rPrice;
    }
    // console.log(receiptTable.rows[1]);
    // for (let i=1; i<receiptTable.rows.length; i++){
    //   console.log(receiptTable.rows[i]);
    //   receiptTable.deleteRow(i);
    // }
    console.log(receiptTable.rows[2]);
    cart.forEach(addItemToReceipt);
    tax = subTotal * 0.06;
    total = subTotal + tax;
    for (let elem of document.querySelectorAll(".subtotal")){
      elem.innerHTML = `Subtotal: $${subTotal.toFixed(2)}`;
    }
    for (let elem of document.querySelectorAll(".tax")){
      elem.innerHTML = `Tax: $${tax.toFixed(2)}`;
    }
    for (let elem of document.querySelectorAll(".total")){
      elem.innerHTML = `Total: $${total.toFixed(2)}`;
    }
  }
}

//calculate change
document.getElementById("cash-calculate").addEventListener("click", function(event){ 
  
  let cashChange= document.getElementById("get-cash-paid").value;
  cashChange=parseFloat(cashChange);
  console.log(`cash change is: ${cashChange}`);
   cashChange= cashChange- total;
   console.log(`change due is: ${cashChange}`);
 
  document.getElementById('cash-paid').append(total.toFixed(2));
  document.getElementById('change-due').append(cashChange.toFixed(2));
});

document.getElementById('view-receipt').addEventListener('click', function(e){
  const viewReciept = document.querySelector(".receipt");
    viewReciept.classList.toggle("hidden");
    const checkout = document.querySelector(".checkout");
  checkout.classList.toggle("hidden");
})


//verify CC number
document.getElementById("checkout-submit").addEventListener("click", validateCC);

function validateCC(event){
  event.preventDefault();
  const number = document.getElementById("ccNumber").value
  if (isCCValid(number)){
    const validCC = document.querySelector(".receipt");
    validCC.classList.toggle("hidden");
    const checkout = document.querySelector(".checkout");
  checkout.classList.toggle("hidden");
  }else{
    alert("Credit Card number is not valid. Please enter a valid credit number.")
  }
}

function isCCValid(number) {
  number = String(number);

  let sum = parseInt(number.charAt(number.length - 1));

  for (let i = 0; i < number.length - 1; i++) {
      let value = parseInt(number.charAt(i));

      if (i % 2 === 0) {
          value *= 2;
      }

      if (value > 9) {
          value -= 9;
      }

      sum += value;
  }

  return sum % 10 === 0;
}


// let modal = document.getElementById("myModal");

// // Get the button that opens the modal
// let btn = document.getElementById("myBtn");


// // Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// Add wine to wine menu
let wineList = document.getElementById("main");
for (let index = 0; index < wines.length; index++){
  const element = wines[index];
  const wineInfo = document.createElement("div");
  wineInfo.classList.add("wine-info");
  wineInfo.setAttribute("id", "wine-" + (index+1));
  console.log(wines[index]);

  //Get image
  const wineImage = document.createElement("img");
  wineImage.setAttribute("src", element.src);
  wineImage.classList.add("wine-image");
  wineInfo.append(wineImage);

  //Get name
  const wineName = document.createElement("h3");
  wineName.innerText = element.name;
  wineName.classList.add("wine-name");
  wineInfo.append(wineName);

  //Get category
  const wineCat = document.createElement("p");
  wineCat.innerText = "Category: " + element.category;
  wineCat.classList.add("wine-category");
  wineInfo.append(wineCat);

  //Get description
  const wineDesc = document.createElement("p");
  wineDesc.innerText = "Description: " + element.desc;
  wineDesc.classList.add("wine-description");
  wineInfo.append(wineDesc);

  //Get Price
  const winePrice = document.createElement("p");
  winePrice.innerText = "Price: $" + element.price;
  winePrice.classList.add("wine-price");
  wineInfo.append(winePrice);

  //Add to cart Button
  const itemsInCart = document.getElementById("open-cart");
  const addToCart = document.createElement("button");
  addToCart.innerText = "Add To Cart";
  addToCart.classList.add("add-to-cart");
  addToCart.addEventListener("click", function () {
    let selectedWine = wines[index]
    console.log(selectedWine);
    let wineCount = 0;
    for (wine of cart){
      wineCount += wine.qty;
      if (selectedWine.name === wine.name){
        wine.qty += 1;
        itemsInCart.innerHTML = "Cart ( " + (wineCount + 1) + " )";
        return;
      }
    }
    selectedWine.qty = 1;
    cart.push(selectedWine);
    itemsInCart.innerHTML = "Cart ( " + (wineCount + 1)+ " )";
  });
  wineInfo.append(addToCart);
  wineList.append(wineInfo);


}


