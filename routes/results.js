const express = require('express');
const router = express.Router();
const request = require('request');
const { ensureAuthenticated } = require('../config/auth');

// router.get('/testresults', (req, res) => {
//   res.render('testresults');
// })

// let body;
// const minimal = "['Minimal']";
// const mild = "['Mild']";
// const moderate = "['Moderate']";
// const severe = "['Severe']";

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

// router.get('/testresults', function(req, res) {  
//     request('http://127.0.0.1:5000/flask', function (error, response, body) {
//         // this.body=body;
//         console.error('error:', error); // Print the error
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         console.log('body:', body); // Print the data received
//         console.log(typeof body);
//         console.log(response)
//         // var myOut = {body: body};
//         // globArr.push(myOut);
//         res.send(body); //Display the response on the website
        // res.render('ResultsScreenHTML', {output: body});
      // });
    //   if (body === minimal) {
    //     document.getElementById("diagnosis").innerHTML = resultArray[0];
    //     document.getElementById("seekTherapy").innerHTML = suggestArray[0];
    //     document.getElementById("symptoms").innerHTML = symptomArray[0];
    // } else if (body === mild) {
    //     document.getElementById("diagnosis").innerHTML = resultArray[1];
    //     document.getElementById("seekTherapy").innerHTML = suggestArray[1];
    //     document.getElementById("symptoms").innerHTML = symptomArray[1];
    // } else if (body === moderate) {
    //     document.getElementById("diagnosis").innerHTML = resultArray[2];
    //     document.getElementById("seekTherapy").innerHTML = suggestArray[2];
    //     document.getElementById("symptoms").innerHTML = symptomArray[2];
    // } else if (body === severe) {
    //     document.getElementById("diagnosis").innerHTML = resultArray[3];
    //     document.getElementById("seekTherapy").innerHTML = suggestArray[3];
    //     document.getElementById("symptoms").innerHTML = symptomArray[3];
    // }
    // res.render('ResultsScreenHTML');       
// });
module.exports = router;
