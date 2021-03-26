const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

module.exports = async (req, res, next) => {
    try {
        const username = req.username;
        const url = req.url.replace('/', '');
        const posts = await db.Post.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        const favorites = await db.Favorite.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        console.log(favorites);
        res.render(url, {
            username,
            posts,
            favorites
        });
    } catch (err) {
        return res.status(401).send(err);
    }
}