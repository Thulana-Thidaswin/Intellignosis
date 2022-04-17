const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios')


const upload = require('express-fileupload')
const request = require('request')

router.get('/AnalyzeScreenHTML', (req, res) => {
    res.render('AnalyzeScreenHTML');
})

// router.post('/', (req, res) =>{
//   if (req.files){
//     console.log(req.files)
//     const file = req.files.file;
//     const filename = file.name;
//     console.log(filename)

//     file.mv('./Upload/' + filename, function(err){
//       if (err){
//         res.send(err)
//       } else {
//         res.render(__dirname + "/ResultsScreenHTML")
//       }
//     })
//   } 
// })

router.post('/analyze', (req, res)=>{
  console.log('Inside Analyze GET endpoint!!!')
    if (req.files){
    console.log(req.files)
    const file = req.files.file;
    const filename = file.name;
    console.log(filename)

    file.mv('./Upload/' + filename);
    }
  axios({
    method: 'get',
    url: 'http://localhost:5000/flask',
    data: null
  }).then((response) => {
    console.log("Results from flask: ");
    console.log(response.data)
    // console.log(JSON.parse(response.data))
    console.log("Flask is responding")
    var services = response.data
    services = services .split(",");
    services [0] = services [0].substring(1);
    services [services .length - 1] = services [services .length - 1].substring(
      0,
      services [services .length - 1].length - 1
    );
    services .forEach((x, i) => {
      services [i] = services [i].includes('"') ? services [i].replaceAll('"', "").trim()
        : services [i].replaceAll("'", "").trim();
    });

    res.redirect(`/ResultsScreenHTML?data=${services}`)
  }, (error) => { 
    console.log(error);
  })

})

module.exports = router;


