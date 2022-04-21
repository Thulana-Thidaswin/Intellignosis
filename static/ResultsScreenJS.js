window.onload = function() {changeResult()};

//Getting current date
let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

const date = today;
const patientName = "Arif Thidaswin";
const age = 20;
// let myPred;
// let pred_output = "['Minimal']"

// const pred_output = document.getElementById("pred_result");

// const resultArray = ["The patient is suffering from <b>Minimal</b> Depression.",
//                     "The patient is suffering from <b>Mild</b> Depression.",
//                     "The patient is suffering from <b>Moderate</b> Depression.",
//                     "The patient is suffering from <b>Severe</b> Depression."];

// const suggestArray = ["A psychiatrist consultation is not necessary.", 
//                       "Consulting an understanding adult is highly recommended.", 
//                       "A psychiatrist consultation is recommended.",
//                       "A psychiatrist consultation is highly necessary."];

// const symptomArray = ["The patient might show slight symptoms of moodiness or sleepiness",
//                     "The patient might show symptoms of disinterest and loss of appetite in addition to feeling sleepy.",
//                     "The patient might show symptoms of sudden mood changes as well as insomnia.",
//                     "The patient might show suicidal behaviour as well as sudden mood changes and delusions."];
                    
// const minimal = "['Minimal']";
// const mild = "['Mild']";
// const moderate = "['Moderate']";
// const severe = "['Severe']";

  function changeName() {
    document.getElementById("details").innerHTML = "Date : " + date + "<br>Patient Name  : " + patientName + "<br>Patient Age   : " + age + " years";
  }

// function changeResult() {
//   var pred_output = "{{prediction}}";
//   if (pred_output === minimal) {
//     document.getElementById("diagnosis").innerHTML = resultArray[0];
//     document.getElementById("seekTherapy").innerHTML = suggestArray[0];
//     document.getElementById("symptoms").innerHTML = symptomArray[0];
//   } else if (pred_output === mild) {
//     document.getElementById("diagnosis").innerHTML = resultArray[1];
//     document.getElementById("seekTherapy").innerHTML = suggestArray[1];
//     document.getElementById("symptoms").innerHTML = symptomArray[1];
//   } else if (pred_output === moderate) {
//     document.getElementById("diagnosis").innerHTML = resultArray[2];
//     document.getElementById("seekTherapy").innerHTML = suggestArray[2];
//     document.getElementById("symptoms").innerHTML = symptomArray[2];
//   } else if (pred_output === severe) {
//     document.getElementById("diagnosis").innerHTML = resultArray[3];
//     document.getElementById("seekTherapy").innerHTML = suggestArray[3];
//     document.getElementById("symptoms").innerHTML = symptomArray[3];
//   }
// }