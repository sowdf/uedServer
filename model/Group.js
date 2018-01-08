const db = require('../data/db');
const Sequelize = require('sequelize');

const Group = db.define('group',{
    uid : {
        type : Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    group : {
        type : Sequelize.INTEGER(4),
        allowNull: false,
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
Group.sync();


module.exports = User;


