module.exports = {
    ensureAuthenicated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('errorMsg', 'Please Login first');
        req.redirect('/users/login');
    }
}