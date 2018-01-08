const db = require('../data/db');
const Sequelize = require('sequelize');

let Weekly = db.define('weekly',{
    wid : {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    uid : {
        type : Sequelize.INTEGER(11),
        allowNull : false
    },
    weekWork : { //本周工作
        type : Sequelize.STRING(3000),
        allowNull : false
    },
    nextWork : { //下周工作
        type : Sequelize.STRING(3000),
        allowNull : false
    },
    conclusion : { //总结
        type : Sequelize.STRING(3000),
        allowNull : false
    },
    weekId : { //星期id
        type : Sequelize.INTEGER(11),
        allowNull: false,
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

Weekly.sync();
module.exports = Weekly;