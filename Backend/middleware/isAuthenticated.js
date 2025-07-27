const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token)

        if (!token) {
            return res.status(401).json({ message: 'login required.' });
        }

        // ✅ JWT secret from environment variable
        const jwtSecret = process.env.JWT_SECRET || "fallback-secret";

        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Attach decoded user data to the request
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = isAuthenticated;
