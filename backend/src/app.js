const express = require('express');
const session = require('express-session');
const passport = require('passport');
const AuthRouter = require("./routes/auth.routes");
const { ensureAuthenticated } = require("./middlewares/index");

const dotenv = require('dotenv');

const logger = require("morgan");
const setupPassport = require('./middlewares/passport');

dotenv.config();

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());

// Session middleware
app.use(
    session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

setupPassport();

app.get('/', (req, res, next) => {
    res.send(req.user ? { 'status': true } : { 'status': false });
})

app.use("/auth", AuthRouter);

// Auth0 callback route
app.get(
    '/callback',
    passport.authenticate('auth0', { failureRedirect: '/auth/login-failed', }),
    (req, res, next) => {
        try {
            res.redirect('/profile'); // Redirect to the profile page after successful login

        } catch (err) {
            next(err);
        }
    }
);

// Profile route to display user details
app.get('/profile', ensureAuthenticated, (req, res) => {
    res.send({
        user: req.user
    });
});

//catch route not found
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error Handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: process.env.NODE_ENV !== 'production' ? err : {}
    });
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
