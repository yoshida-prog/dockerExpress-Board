const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

module.exports = async (req, res, next) => {
    try {
        const username = req.username;
        const url = req.url.replace('/', '');
        const user = await db.User.findOne({
            where: {
                name: username
            }
        });
        const userID = user.id;
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
        //ログイン中のユーザーがいいねしている投稿IDを保持する配列を作成
        const userFavList = [];
        const userFavorites = await db.Favorite.findAll({
            where: {
                userID
            }
        });
        userFavorites.forEach(userFavorite => {
            userFavList.push(userFavorite.contentID);
        });
        res.render(url, {
            username,
            userID,
            posts,
            favList,
            userFavList
        });
    } catch (err) {
        return res.status(401).send(err);
    }
}