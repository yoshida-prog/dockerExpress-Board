const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    createContent: async (req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const username = req.username;
        if (!title || !content) {
            const createErrorMessage = 'タイトルもしくは投稿内容が入力されていません';
            res.render('create', {
                err: createErrorMessage,
                username
            });
        } else if (content.length > 140) {
            const lengthErrorMessage = '140文字以内で投稿してください'
            res.render('create', {
                err: lengthErrorMessage,
                username
            });
        } else {
            const user = await db.User.findOne({
                where: {
                    name: username
                }
            });
            const userID = user.id;
            const postCreate = await db.Post.create({
                userID,
                username,
                title,
                content,
                nothingFav: true,
                favYourself: false
            });
            res.redirect('/board');
        }
    }
}