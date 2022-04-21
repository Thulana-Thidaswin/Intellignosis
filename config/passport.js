const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//loading the user model 
const User = require('../models/User');
const flash = require('connect-flash');

module.exports = function(passport) {
    //local strategy checks if the user exists in the database
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          // Match user
          User.findOne({
            email: email
          }).then(user => {
            if (!user) {
              return done(null, false, { message: 'That email is not registered' });
            }
    
            // Checks if the password is correct
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: 'Password incorrect' });
              }
            });
          });
        })
      );
    //serializing the user to store in the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //deserializing the user from the session
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>  {
          done(err, user);
        });
    });
}