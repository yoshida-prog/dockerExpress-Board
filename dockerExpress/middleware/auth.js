const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        req.username = decoded.username;
        if (!decoded) {
            throw 'トークンがありません';
        } else {
            next();
        }
    } catch (err) {
        return res.status(401).json({
            message: 'Not authenticated'
        });
    }
}
