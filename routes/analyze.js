const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


const upload = require('express-fileupload')
const request = require('request')

router.get('/AnalyzeScreenHTML', (req, res) => {
    res.render('AnalyzeScreenHTML');
})

router.post('/', (req, res) =>{
  if (req.files){
    console.log(req.files)
    var file = req.files.file
    var filename = file.name
    console.log(filename)

    file.mv('./Upload/' + filename, function(err){
      if (err){
        res.send(err)
      } else {
        res.render(__dirname + "/app.py")
      }
    })
  } 
})

module.exports = router;



