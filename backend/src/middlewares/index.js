// Middleware function to check if the user is authenticated
const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {

    let token = req.session.jwt;
    let status = {
        message: ""
    }

    if (!token) status.message = "No Token is provided.";

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) status.message = "Failed to Authenticate Request"

    })

    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }

    res.status(401).send({ "status": false, message: status.message });


};

module.exports = {
    ensureAuthenticated
}