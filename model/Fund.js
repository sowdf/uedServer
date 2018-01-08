/**
 * 基金  模型
 */
const db = require('../data/db');
const Sequelize = require('sequelize');



const Fund = db.define('fund',{
    name : {
        type : Sequelize.STRING(30),
        allowNull: true,
    },
    fundcode : {
        type : Sequelize.STRING(10),
        allowNull: true,
    },
    jzrq : {
        type : Sequelize.STRING(10),
        allowNull: true,
    },
    dwjz : {
        type : Sequelize.STRING(10),
        allowNull: true,
    },
    gsz : {
        type : Sequelize.STRING(10),
        allowNull: true,
    },
    gszzl : {
        type : Sequelize.STRING(10),
        allowNull: true,
    },
    gztime : {
        type : Sequelize.STRING(50),
        allowNull: true,
    },
    isProfit : {
        type : Sequelize.INTEGER(1),
        allowNull: true,
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

Fund.sync();

module.exports = Fund;