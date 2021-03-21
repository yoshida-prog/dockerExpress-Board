const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        const username = decoded.username;
        const url = req.url.replace('/', '');
        req.jwtPayload = decoded;
        res.render(url, {username});
    } catch (err) {
        return res.status(401).json({
            message: 'Not authenticated'
        });
    }
}
