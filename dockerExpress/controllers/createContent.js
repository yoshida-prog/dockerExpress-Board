const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    createContent: (req, res) => {
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
            db.User.findOne({
                where: {
                    name: username
                }
            }).then(async (results) => {
                const userID = await results.id;
                console.log('hi');
                db.Post.create({
                    userID,
                    username,
                    title,
                    content
                }).then(() => {
                    res.redirect('/board');
                }).catch(err => {
                    res.status(500).send(err);
                });
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }
}