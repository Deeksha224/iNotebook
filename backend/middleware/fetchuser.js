const jwt = require('jsonwebtoken');
const JWT_SECRET = "createdByDeeksha:)";

// Middleware to fetch user from the JWT token and add it to the request object
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token'); // Get the token from the request header and add id to the request object
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        // Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Add the user data to the request object
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    
}

module.exports = fetchuser;