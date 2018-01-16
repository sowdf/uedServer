const db = require('../data/db');
const Sequelize = require('sequelize');

const SchedulingUser = db.define('schedulingUser',{
    mid : {
        type : Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    name : {
        type : Sequelize.STRING(20),
        allowNull : true
    },
    email : {
        type : Sequelize.STRING(30),
        allowNull : true
    },
    position: {
        type : Sequelize.INTEGER(2),
        allowNull : true
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

SchedulingUser.sync();

module.exports = SchedulingUser;