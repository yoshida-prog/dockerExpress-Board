const { Sequelize } = require('sequelize');
const db = require('../models/DBconfig');

exports.rootAccessControl = {
    favorite: (req, res) => {
        const username = req.username;
        const contentID = req.body.contentID;
        const favoriteCount = req.body.favoriteCount;
        console.log(contentID, favoriteCount);
    }
}