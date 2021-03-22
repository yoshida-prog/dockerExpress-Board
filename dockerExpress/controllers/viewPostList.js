const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

module.exports = (req, res, next) => {
    try {
        const username = req.username;
        const url = req.url.replace('/', '');
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
