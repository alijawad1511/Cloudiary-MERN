const jwt = require("jsonwebtoken");
const JWT_SECRET = 'jwt_scret';


module.exports = function (req, res, next) {
    // Get the token from the header
    const token = req.header("x-auth-token");

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: "No Token! Access Denied" })
    }

    // Verify if token exists
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: "no token found. Access Denied (Error in Catch)" });
    }

}