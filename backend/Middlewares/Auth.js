const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']; 
    console.log("Body:", req.body);
    console.log("query",req.query.category)

    console.log("authHeader : ",authHeader);
    
    if (!authHeader) {
        console.log("No auth header");
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    const token = authHeader;
    console.log(token);
    
    if (!authHeader) {
        console.log("No token found");
        return res.status(403).json({ message: ' JWT token is required----' });
    }

    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT error:", error.message);
        return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
};

module.exports = ensureAuthenticated;
