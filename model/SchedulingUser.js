const db = require('../data/db');
const Sequelize = require('sequelize');

const SchedulingUser = db.define('schedulingUser',{
    isWorking : {
        type : Sequelize.INTEGER(1),
        allowNull:true,
        defaultValue : 1,
    },
    mid : {
        type : Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    workNumber : {
        type : Sequelize.INTEGER(5),
        allowNull:false
    },
    tel : {
        type : Sequelize.INTEGER(11),
        allowNull:false
    },
    name : {
        type : Sequelize.STRING(20),
        allowNull : true
    },
    email : {
        type : Sequelize.STRING(50),
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