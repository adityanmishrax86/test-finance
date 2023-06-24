const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../models');

const dotenv = require('dotenv');
dotenv.config();

// Define the User model
const User = db.User;

// Auth0 login route
router.get('/login', (req, res, next) => {

    if (req.isAuthenticated()) res.redirect('/profile');

    passport.authenticate('auth0', { scope: 'openid email profile', prompt: "login" }, (err, user, info) => {
        if (err) {
            return next(err);
        }
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

router.post('/login', (req, res, next) => {

    if (req.isAuthenticated()) res.redirect('/profile');

    passport.authenticate('local', (err, user) => {
        if (err) {
            console.error({
                message: "Passport Authentication Error",
                data: err
            })
        }
        if (!user) {
            return res.status(401).send({
                status: false,
                message: "Either Provided Username or password is incorrect. Please Check the credentials."
            })
        }
        if (!req.session.jwt) {
            req.logIn(user, (lgError) => {
                if (lgError) {
                    console.error({
                        message: "Login Error",
                        data: lgError
                    })
                }
                req.session.jwt = user?.token;
                return res.status(200).send({
                    status: true,
                    user: {
                        name: user.username.name,
                        id: user.username.id
                    }
                });
            })
        }

    })(req, res, next)
})

router.post('/signup', async (req, res, next) => {

    if (req.isAuthenticated()) res.redirect('/profile');

    const { name, email, password } = req.body;
    let user;
    try {
        //first search if user already exists or not
        user = await User.findOne({
            where: {
                email: email.toString()
            }
        })

        if (user !== null) {
            return res.status(200).send({
                status: false,
                message: "User is already registered with us. Please Login with the given Email address."
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        user = await User.create({
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
        })

        res.status(200).send({
            status: true,
            message: "User Signup Successful.Please login to the Application"
        })

    } catch (err) {
        next(err)
    }
    return user;
})

router.get('/login-failed', (req, res) => {
    res.status(204).send({ "status": false, message: 'Login Declined' });
})



router.get('/logout', (req, res, next) => {
    req.session.jwt = null;
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = router;