//Main Server File

//Requires the config file
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const upload = require('express-fileupload');

require('events').EventEmitter.prototype._maxListeners = 100;

//Importing the passport and database configuration
require('./config/passport')(passport);
require('./models/User')(passport);

//Ejs configuration
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(upload())
//body parser
app.use(express.urlencoded({ extend: false }));

//express middleware
app.use(
    //bruv what does this do?!
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash tings
app.use(flash());

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



//Connect all the static files to server
app.use(express.static('public'))


//Connecting the database_
const mongoose = require('mongoose')

//Connects the local server to database
const ldb = require('./config/keys').MongoURI;
mongoose.connect(ldb, { useNewURLParser: true })
 .then(() => console.log("MongoDB Connected..."))
 .catch(err => console.error(err))

// DONT REMOVE THIS BALLO
//might wanna check this
//mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true})
//const db = mongoose.connection
//db.on('error', error => console.error(error))
//db.once('open', () => console.log('Connected to Mongoose'))

//DONT REMOVE THIS LINE
//Connects the routes to server
app.use('/', require('./routes/index')) 
app.use('/users', require('./routes/users'))
app.use('/', require('./routes/analyze'))

app.listen(process.env.PORT || 3000)



