const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token)

        if (!token) {
            return res.status(401).json({ message: 'login required.' });
        }

        const decoded = jwt.verify(token, "your_secret_key");
        req.user = decoded; // Attach decoded user data to the request
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = isAuthenticated;
