const db = require('../data/db');
const Sequelize = require('sequelize');
let Week = db.define('week',{
    weekId : {
        type : Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    startTime : {
        type : Sequelize.STRING(20),
        allowNull : false
    },
    endTime : {
        type : Sequelize.STRING(20),
        allowNull : false
    },
    startTimeText : {
        type : Sequelize.STRING(30),
        allowNull : false
    },
    endTimeText : {
        type : Sequelize.STRING(30),
        allowNull : false
    }
},{freezeTableName:true});

Week.sync();

module.exports = Week;