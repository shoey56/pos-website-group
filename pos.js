
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
