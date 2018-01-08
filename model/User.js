const db = require('../data/db');
const Sequelize = require('sequelize');

const User = db.define('user',{
    uid : {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    account : {
        type : Sequelize.STRING(30),
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull:false
    }

},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
User.sync();

module.exports = User;


