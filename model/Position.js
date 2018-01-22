const db = require('../data/db');
const Sequelize = require('sequelize');

const Position = db.define('position',{
    pid : {
        type : Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    key : {
        type : Sequelize.STRING(20),
        allowNull : true
    },
    position_name :{ // position Id   职位id
        type : Sequelize.STRING(20),
        allowNull : true
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

Position.sync();

module.exports = Position;