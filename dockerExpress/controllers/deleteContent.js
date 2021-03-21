const jwt = require('jsonwebtoken');
const config = require('../config/jwtConfig');
const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    delete: (req, res) => {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, config.jwt.secret);
        const username = decoded.username;
        if (!username) {
            res.status(500).send('トークンが発行されていません');
        } else {
            const deleteID = req.params.id;
            console.log(deleteID);
            db.Post.destroy({
                where: {
                    id: deleteID
                }
            }).then(() => {
                res.redirect('/board');
            }).catch(err => {
                res.status(500).send(err);
            })
        }
    }
}