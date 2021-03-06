module.exports = {
    ensureAuthenicated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('errors_msg', 'Please Login first');
        req.redirect('/users/login');
    }
}

// If User tries to access a page/ URL which is not available to him/her, then he/she will be redirected to the login page.