const express = require('express');
const app = express();
require("dotenv").config();
const logger = require("morgan");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


// Middlewares
app.use(logger('dev'));
app.use(express.json());


const config = {
  authRequired: false,
  auth0Logout: true
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

app.get('/profile', requiresAuth(), (req, res, next) => {
  res.status(200).json(req.oidc?.user);
  
})


app.get('/', (req, res) => {
  const isAuthenticated = req.oidc?.isAuthenticated()
  res.status(200).json({'success': isAuthenticated ? true : false});
});



// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is up on port 3000.');
});
