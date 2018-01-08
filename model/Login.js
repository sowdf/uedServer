const db = require('../data/db');
const Sequelize = require('sequelize');

const Login = db.define('login',{
    uid : {
        type : Sequelize.STRING,
        allowNull:false,
        primaryKey : true
    },
    cookie : {
        type : Sequelize.STRING,
        allowNull : false
    }
},{
    freezeTableName : true
});
Login.sync();

module.exports = Login;


