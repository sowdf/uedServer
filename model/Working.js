const db = require('../data/db');
const Sequelize = require('sequelize');

const Working = db.define('working',{
    actId : {
        type : Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    name : {
        type : Sequelize.STRING(20),
        allowNull : true
    },
    pid:{ // position Id   职位id
        type : Sequelize.INTEGER(10),
        allowNull:true,
    },
    dateAry : { //日期
        type : Sequelize.STRING(1500),
        allowNull:true,
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

Working.sync();

module.exports = Working;