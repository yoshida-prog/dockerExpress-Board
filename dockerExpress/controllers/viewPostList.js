const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        const username = decoded.username;
        const url = req.url.replace('/', '');
        req.jwtPayload = decoded;
        db.User.findOne({
            where: {
                name: username
            }
        }).then(() => {
            db.Post.findAll({
                order: [
                    ['id', 'DESC']
                ]
            }).then(posts => {
                const postArray = [];
                res.render(url, {
                    username,
                    posts
                });
            }).catch(err => {
                res.status(500).send(err);
            })
        }).catch(err => {
            res.status(500).send(err);
        })
    } catch (err) {
        return res.status(401).send(err);
    }
}