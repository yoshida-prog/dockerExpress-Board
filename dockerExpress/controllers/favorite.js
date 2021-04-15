const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    favorite: async (req, res, next) => {
        const username = req.username;
        const contentID = req.body.contentID;
        const favoriteCount = req.body.favoriteCount;
        const isUser = await db.User.findOne({
            where: {
                name: username
            }
        });
        const userID = isUser.id;
        const isPost = await db.Post.findOne({
           where: {
               id: contentID
           }
        });
        const isFavorite = await db.Favorite.findOne({
            where: {
                userID,
                contentID
            }
        });
        if (!isFavorite) {
            console.log('not favorite');
            if (userID === isPost.userID) {
                const booleanFavYourself = isPost.favYourself;
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
            console.log('already favorite');
            if (userID === isPost.userID) {
                const booleanFavYourself = isPost.favYourself;
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
        res.redirect('/board');
    }
}