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
})

module.exports = GoogleTrend;
