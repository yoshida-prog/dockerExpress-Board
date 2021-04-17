const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    favorite: async (req, res, next) => {
        const userID = Number(req.body.userID);
        const contentID = req.body.contentID;
        const favoriteCount = req.body.favoriteCount;
        const Post = await db.Post.findOne({
           where: {
               id: contentID
           }
        });
        const Favorite = await db.Favorite.findOne({
            where: {
                userID,
                contentID
            }
        });
        if (!Favorite) {
            if (userID === Post.userID) {
                const booleanFavYourself = Post.favYourself;
                const changeFavYourself = await db.Post.update(
                    { favYourself: !booleanFavYourself },
                    { where: { id: contentID } }
                );
            };
            if (favoriteCount === '0') {
                const changeNothingFav = await db.Post.update(
                    { nothingFav: false },
                    { where: { id: contentID } }
                );
            };
            const insertThisFav = await db.Favorite.create({
                userID,
                contentID
            });
        } else {
            if (userID === Post.userID) {
                const booleanFavYourself = Post.favYourself;
                const changeFavYourself = await db.Post.update(
                    { favYourself: !booleanFavYourself },
                    { where: { id: contentID } }
                );
            };
            if (favoriteCount === '1') {
                const changeNothingFav = await db.Post.update(
                    { nothingFav: true },
                    { where: { id: contentID } }
                );
            };
            const destroyThisContentFav = await db.Favorite.destroy({
                where: {
                    userID,
                    contentID
                }
            });
        }
        res.json({});
    }
}