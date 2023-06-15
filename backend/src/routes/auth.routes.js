const router = require('express').Router();
const passport = require('passport');


// Auth0 login route
router.get('/login', (req, res, next) => {
    passport.authenticate('auth0', { scope: 'openid email profile', prompt: "login" }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        console.log(info);
        if (!user) {
            // Login denied or failed
            return res.redirect('/login-failed'); // Redirect to a login failed page or display an error message
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Successful login
            return res.redirect('/profile'); // Redirect to the profile page
        });
    })(req, res, next);
});

router.get('/login-failed', (req, res) => {
    res.status(204).send({ "status": false, message: 'Login Declined' });
})



router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = router;