// Middleware function to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    res.status(400).send({ "status": false, message: "Unauthenticated Request" }); // User is not authenticated, redirect to the login page
};


module.exports = {
    ensureAuthenticated
}