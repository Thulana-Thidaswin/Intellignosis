const LocalStategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//loading the user model 
const User = require('C:/Users/arifz_t8hzclv/OneDrive/Documents/uni stuffs/testCodes/nodejs/WDS/NewProject/models');
const flash = require('connect-flash');

module.exports = function(passport) {
    passport.use(
        new LocalStategy({ username: 'email' }, (email, password, done) => {
            //checking if user matches p
            User.findOne({ email: email})
                .then(user => {
                    if(!user) {
                        return done(null, false, { message: "That email is not registered." });
                    }

                    //if is register we gon compare password
                    bcrypt.compare(password, user.password, (err, isMatching) => {
                        if (err) throw err;

                        if (isMatching) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Password incorrect" });                        }
                    });


                })
                .catch(err => console.error(err))
        })
    );

    //serializing the user and deserializing the user?
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>  {
          done(err, user);
        });
    });
}