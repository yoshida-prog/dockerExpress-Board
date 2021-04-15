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
            attributes: [
                'contentID',
                [db.sequelize.fn('count', db.sequelize.col('contentID')), 'favCount']
            ],
            group: 'contentID'
        });
        const favList = favorites.map((favorite) => {
            return favorite.dataValues;
        });
        // favListをcontentID降順に並び替え
        favList.sort((a, b) => {
            return a.contentID > b.contentID ? -1 : 1;
        });
        console.log(favList);
        res.render(url, {
            username,
            posts,
            favList
        });
    } catch (err) {
        return res.status(401).send(err);
    }
}