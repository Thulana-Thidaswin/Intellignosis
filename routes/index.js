//ROutes for the differnt files
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');


router.get('/', (req, res) => {
    res.render('welcome');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { name: req.user.name });
})

router.get('/AboutHTML', (req, res) => {
    res.render('AboutHTML');
})

router.get('/AccountPreview', (req, res) => {
    res.render('AccountPreview', { username: req.user.email, age: req.user.age, 
        location: req.user.location, occupation: req.user.occupation, name: req.user.name},);
})

router.get('/AccountSettingsHTML', (req, res) => {
    res.render('AccountSettingsHTML', { id: req.user._id, username: req.user.email, age: req.user.age, 
        location: req.user.location, occupation: req.user.occupation, name: req.user.name},);
})

router.get('/AddressChangeHTML', (req, res) => {
    res.render('AddressChangeHTML');
})

router.get('/passwordChangeHTML', (req, res) => {
    res.render('passwordChangeHTML');
})

router.get('/AnalysisLoadingHTML', (req, res) => {
    res.render('AnalysisLoadingHTML');
})

router.get('/BirthdatechangeHTML', (req, res) => {
    res.render('BirthdatechangeHTML');
})


router.get('/ChangeScreenHTML', (req, res) => {
    res.render('ChangeScreenHTML');
})

router.get('/ConsultantScreenHTML', (req, res) => {
    res.render('ConsultantScreenHTML');
})

router.get('/EmailChangeHTML', (req, res) => {
    res.render('EmailChangeHTML');
})

router.get('/loadingChanges', (req, res) => {
    res.render('loadingChanges');
})


router.get('/EditScreenHTML', (req, res) => {
    
    /*try {

        const id = req.query.id;

        const userData = User.findById({ _id:id});

        if (userData){
            res.render('EditScreenHTML', { user:userData });
        } else {
            res.redirect('/dashboard')
        }

    } catch (error) {
        console.log(error.message);
    }*/
    res.render('EditScreenHTML', { id: req.user._id, username: req.user.email, age: req.user.age, 
        location: req.user.location, occupation: req.user.occupation, name: req.user.name},);
})


router.post('/EditScreenHTML', (req, res) => {
    try {
        /*if(req.file) {

        } else { */
            User.findByIdAndUpdate({ _id: req.body.user_id}, {$set:{email: req.body.email, age: req.body.age, 
                location: req.body.location, occupation: req.body.occupation, name: req.body.name }},{new:true}).then((docs)=>{
                    if(docs) {
                       resolve({success:true,data:docs});
                    } else {
                       reject({success:false,data:"no such user exist"});
                    }
                }).catch((err)=>{
                   
                });
             
        //}

        res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }
})


router.get('/MoreInHTML', (req, res) => {
    res.render('MoreInHTML');
})


router.get('/NamechangeHTML', (req, res) => {
    res.render('NamechangeHTML');
})

router.get('/NewPatientHTML', (req, res) => {
    res.render('NewPatientHTML');
})

router.get('/OccupationChangeHTML', (req, res) => {
    res.render('OccupationChangeHTML');
})

router.get('/ResultsScreenHTML', (req, res) => {
    res.render('ResultsScreenHTML');
})

router.get('/SettingsScreenHTML', (req, res) => {
    res.render('SettingsScreenHTML');
})


module.exports = router;