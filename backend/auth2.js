module.exports = { 
    ensureNotAuth: (req, res, next) => {
        //They are logged in
        if (req.isAuthenticated()) {
            req.flash('error_msg', 'You cannot log in or register when already logged in');
            res.redirect('/users/login');
        }
        //Not logged in
        return next();
    }
}