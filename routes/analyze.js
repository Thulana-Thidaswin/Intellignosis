
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios')


const upload = require('express-fileupload')
const request = require('request')

//Getting the request from the form in AnalyzeScreen
router.get('/AnalyzeScreenHTML', (req, res) => {
    res.render('AnalyzeScreenHTML');
})

//Posting the request to the analyze endpoint
router.post('/analyze', (req, res)=>{
    if (req.files){
    console.log(req.files)
    const file = req.files.file;
    const filename = file.name;
    console.log(filename)

    file.mv('./' + filename);
    }
  axios({
    method: 'get',
    url: 'http://localhost:5000/flask',
    data: null
  }).then((response) => {
    console.log("Results from flask: ");
    console.log(response.data)
    console.log("Flask is responding")
    var services = response.data
    //redirecting to the results screen once the data from flask has been received
    res.redirect(`/ResultsScreenHTML?data=${services}`)
  }, (error) => { 
    console.log(error);
  })
})

module.exports = router;


