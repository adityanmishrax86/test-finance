const express = require("express");
const session = require("express-session");
const passport = require("passport");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const AuthRouter = require("./api/v1/auth.routes");
const UserRouter = require("./api/v1/user.route");
const ExpenseRouter = require("./api/v1/userexpenses.routes");
const InsightRouter = require("./api/v1/insight.routes");
const IncomeRouter = require("./api/v1/userincomes.routes");
const SubscriptionRouter = require("./api/v1/usersubscriptions.routes");

const { ensureAuthenticated, errorHandler } = require("./middlewares/index");

const dotenv = require("dotenv");

const logger = require("morgan");
const setupPassport = require("./middlewares/passport");

const helmet = require("helmet");
const cors = require("cors");

dotenv.config();

const app = express();

// Define the options for the Swagger documentation
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance API",
      version: "1.0.0",
      description: "Documentation for Finance API",
    },
    servers: [
      {
        url: "http://localhost:3000", // Replace with your API server URL
      },
    ],
  },
  apis: ["src/swagger.js"], // Path to the Swagger annotations file
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve the Swagger documentation using swagger-ui-express
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.set("trust proxy", true);

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Middlewares
app.use(logger("dev"));
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

setupPassport();

app.get("/", (req, res, next) => {
  res.send({
    status: req.user ? true : false,
  });
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/expenses", ExpenseRouter);
app.use("/api/v1/insights", InsightRouter);
app.use("/api/v1/incomes", IncomeRouter);
app.use("/api/v1/subscriptions", SubscriptionRouter);

// Auth0 callback route
app.get(
  "/callback",
  passport.authenticate("auth0", { failureRedirect: "/auth/login-failed" }),
  (req, res, next) => {
    try {
      res.redirect("/profile"); // Redirect to the profile page after successful login
    } catch (err) {
      next(err);
    }
  }
);

// Profile route to display user details
app.get("/profile", ensureAuthenticated, (req, res) => {
  res.send({
    status: true,
    user: Object.keys(req.user).length > 0 ? req.user : req.username,
  });
});

//catch route not found
app.use(function (req, res, next) {
  const err = new Error("Route Not Found");
  err.status = 404;
  next(err);
});

//Error Handler
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
