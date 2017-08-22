const Sequelize = require('sequelize')
const db = require('../db')

const GoogleTrend = db.define('googleTrend', {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true
    },
    trend: {
        type: Sequelize.JSON
    },
    timestamp: {
        type: Sequelize.INTEGER
    }
    ,
    interval: {
        type: Sequelize.TEXT
    }
})

module.exports = GoogleTrend;
