const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const key = Object.keys(req.cookies);
    if (!key[0]) {
        res.status(401).json({
            message: 'You have not token'
        });
    } else {
        res.clearCookie(key[0]);
        next();
    }
}
