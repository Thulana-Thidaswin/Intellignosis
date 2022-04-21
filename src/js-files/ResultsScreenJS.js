/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
/*W3Schools */
function dropDownMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
date2 = new Date().toLocaleDateString();

const date = date2;
const patientName = "Arif Thidaswin";
const age = 20;

const resultArray = ["The patient is suffering from <b>Minimal</b> Depression (BDI-II-).",
  "The patient is suffering from <b>Mild</b> Depression (BDI-II-20-28).",
  "The patient is suffering from <b>Moderate</b> Depression (BDI-II-20-28).",
  "The patient is suffering from <b>Severe</b> Depression (BDI-II-20-28)."];

const result = 2;




function changeName() {
  document.getElementById("details").innerHTML = "Date          : " + date;
}

function changeResult() {
  document.getElementById("diagnosus").innerHTML = resultArray[result];
}

function changeDesc() {
  document.getElementById("diagnosus").innerHTML = resultArray[result];
}

function changeNotes() {
  //document.getElementById("seekTherapy").innerHTML = ;
  document.getElementById("symptoms").innerHTML = resultArray[result];
}



