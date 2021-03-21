const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    editRouting: (req, res) => {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        const username = decoded.username;
        if (!username) {
            res.status(500).send('トークンが発行されていません');
        } else {
            const editID = req.params.id;
            db.Post.findOne({
                where: {
                    id: editID
                }
            }).then(result => {
                if (!result) {
                    const editErrorMessage = '存在しない投稿です';
                    res.status(500).send(editErrorMessage);
                } else {
                    const isTitle = result.title;
                    const isContent = result.content;
                    res.render('edit', {
                        username,
                        editID,
                        isTitle,
                        isContent
                    });
                }
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    },
    editContent: (req, res) => {
        const isTitle = req.body.title;
        const isContent = req.body.content;
        const editID = req.params.id;
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        const username = decoded.username;
        if (!isTitle || !isContent) {
            const editContentErrorMessage = 'タイトルもしくは投稿内容が入力されていません';
            db.Post.findOne({
                where: {
                    id: editID
                }
            }).then(result => {
                res.render('edit', {
                    err: editContentErrorMessage,
                    username,
                    isTitle: result.title,
                    isContent: result.content,
                    editID
                });
            }).catch(err => {
                res.status(500).send(err);
            })
        } else if (isContent.length > 140) {
            const lengthErrorMessage = '140文字以内で投稿してください'
            res.render('edit', {
                err: lengthErrorMessage,
                username,
                isTitle,
                isContent,
                editID
            });
        } else {
            db.Post.update(
                { title: isTitle, content: isContent},
                { where: { id: editID } }
            ).then(() => {
                res.redirect('/board');
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }
}