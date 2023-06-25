const express = require('express');
const session = require('express-session');
const passport = require('passport');
const AuthRouter = require("./api/v1/routes/auth.routes");
const UserRouter = require("./api/v1/routes/user.route");
const ExpenseRouter = require("./api/v1/routes/userexpenses.routes");
const InsightRouter=require('./api/v1/routes/insight.routes');
const { ensureAuthenticated } = require("./middlewares/index");

const dotenv = require('dotenv');

const logger = require("morgan");
const setupPassport = require('./middlewares/passport');

const helmet = require("helmet");
const cors = require("cors");

dotenv.config();

const app = express();


app.set('trust proxy', true);

app.use(helmet())
app.use(cors(
    {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    }
))

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
    res.send({
        status: req.user ? true : false
    });
})

app.use("/api/v1", AuthRouter);
app.use("/api/v1", UserRouter);
app.use("/api/v1", ExpenseRouter);
app.use("/api/v1", InsightRouter);
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
// app.get('/profile', ensureAuthenticated, (req, res) => {
//     res.send({
//         status: true,
//         user: Object.keys(req.user).length > 0 ? req.user : req.username
//     });
// });

//catch route not found
app.use(function (req, res, next) {
    const err = new Error('Route Not Found');
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
