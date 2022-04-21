//Routes for the authentication
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport');


const User = require('../models/User')


router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, password2, age, location, occupation } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2 || !age) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        age,
        location,
        occupation
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
            age,
            location,
            occupation
          });
        } else {
          
          const newUser = new User({
            name,
            email,
            password,
            age,
            location,
            occupation
          });
  
          
          console.log(newUser); 
          
          
          //hashing the password
          bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              //setting password to hashed
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login')
                })
                .catch(err => console.log(err))

            
          }))
          
        } 
      });
    }
  });

  //login handling
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }
  
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//logout handling
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are now logged out');
  res.redirect('/users/login');
})

module.exports = router