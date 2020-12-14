var modal = document.getElementById("myModal");


// Get the button that opens the modal
var btn = document.getElementById("myBtn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
  if (document.getElementById("year").value < document.getElementById("year").max - 21) {
    document.getElementById("ageBackground").style.display = "none";
  } else if (selectedMonth < currentMonth || (selectedMonth == currentMonth && selectedDay <= currentDate)) {
    document.getElementById("ageBackground").style.display = "none";
  } else {
    alert("You must be 21 to access this site");
    
  }
}




