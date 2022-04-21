
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


const upload = require('express-fileupload')
const request = require('request')
// const {spawn} = require('child_process');





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
        // res.send("File uploaded")
        // res.redirect('/AnalysisLoadingHTML');
        res.sendFile(__dirname + "/ResultsScreenHTML.html")
      }
    })
  } 
})

//Router to handle the incoming request.
// app.get("/", (req, res, next)=>{
//   //Here are the option object in which arguments can be passed for the python_test.js.
//   let options = {
//       mode: 'text',
//       pythonOptions: ['-u'], // get print results in real-time
//         scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
//       args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
//   };
   
//   PythonShell.run('ml-model.py', options, function (err, result){
//         if (err) throw err;
//         // result is an array consisting of messages collected
//         //during execution of script.
//         console.log('result: ', result.toString());
//         res.send(result.toString())
//   });
// });

// app.post("/readPython", (request, response) =>{
//   var dataToSend;
//   const python = spawn('python', ['ml-model.py']);
  
//   python.stdout.on('data', function(data){
//     dataToSend = data.toString();
//   });

//   python.stderr.on('data', data =>{
//     console.error(`stderr: ${data}`);
//   })

//   python.on('exit', (code) => {
//     console.log(response);
//     console.log(`child process exited with code ${code} , ${dataToSend}`);
//   })
// })

// const spawn = require("child_process").spawn;
// const py = spawn('python', ["./flask-app.py", 'Harees']);

// py.stdout.on('data', (data) => {
//   console.log(data.toString());
// })

// py.on('close', (code) => {
//   console.log('child process exited');
// })

/* router.get('/AnalyzeScreenHTML', function(req, res) {
  request('http://127.0.0.1:5000/flask', function (error, response, body) {
      console.error('error:', error); // Print the error
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the data received
      res.send(body); //Display the response on the website
    });      
}); */

// app.use('/', require('ResultsScreenJS')) 

module.exports = router;



