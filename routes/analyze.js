
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios')


const upload = require('express-fileupload')
const request = require('request')

router.get('/AnalyzeScreenHTML', (req, res) => {
    res.render('AnalyzeScreenHTML');
})

router.post('/analyze', (req, res)=>{
  console.log('Inside Analyze GET endpoint!!!')
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

    res.redirect(`/ResultsScreenHTML?data=${services}`)
  }, (error) => { 
    console.log(error);
  })

})

module.exports = router;


