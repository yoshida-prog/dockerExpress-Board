const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        const username = decoded.username;
        req.jwtPayload = decoded;
        res.render('board', {username});
    } catch (err) {
        return res.status(401).json({
            message: 'Not authenticated'
        });
    }
}
