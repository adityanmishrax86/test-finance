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

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);

    if (err && err.name) {
        if (err.name == "SequelizeForeignKeyConstraintError")
            return res.status(500).json({
                message: "Check for the id,",
                status: false,
            })

        else if (err?.parent?.routine == "DateTimeParseError")
            return res.status(500).json({
                message: "Check for correct Start Date or End Date",
                status: false,
            })
    }
    res.json({
        message: err.message,
        status: false,
        error: process.env.NODE_ENV !== 'production' ? err : {}
    });
}

module.exports = {
    ensureAuthenticated,
    errorHandler
}