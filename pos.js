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
let cart = [
  {
    name: "Blair's Baco Noir",
    category: "medium-dry red",
    price: 11.99,
    src: "blankWineBottle.png",
    qty: 2,
    cart: false,
  },
  {
    name: "Tiia's",
    category: "medium-dry red",
    price: 11.99,
    src: "blankWineBottle.png",
    qty: 1,
    cart: false,
  },

  {
    name: "BJ's",
    category: "medium-dry red",
    price: 11.99,
    src: "blankWineBottle.png",
    qty: 3,
    cart: false,
  },
];
document.getElementById("open-cart").addEventListener("click", loadCartPage);

function loadCartPage() {
  const cartPage = document.querySelector(".cartPage");
  cartPage.classList.toggle("hidden");
  let cartTable = document.getElementById("itemsInCart");
  if (cart.length < 1) {
    cartTable.classList.add("hidden");
  } else {
    document.getElementById("noItemsMessage").classList.add("hidden");
    cart.forEach(addItemToTable);
    calculateTotal();
  }  


  function addItemToTable(item) {
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
      removeFromCart.onclick = removeItem;
      remove.appendChild(removeFromCart);
      item.cart = true;
    }
  }

  function removeItem(event) {
    event.preventDefault();
    event.path[2].remove();
    calculateTotal();
  }
}

// Calculate total
let subTotal = 0;
let tax = 0;
let total = 0;

function calculateTotal() {
  subTotal = 0;
  tax = 0;
  total = 0;
  let cartTable = document.getElementById("itemsInCart");
  let rows = cartTable.querySelectorAll("tr");
  for (r = 1; r < rows.length; r++) {
    let rowData = rows[r].querySelectorAll("td");
    rQty = rowData[1].innerText;
    rPrice = rowData[2].innerText;
    subTotal = subTotal + rQty * rPrice;
  }

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


let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

