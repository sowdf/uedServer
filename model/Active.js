const db = require('../data/db');
const Sequelize = require('sequelize');

const Active = db.define('active',{
    actId : { //活动id
        type : Sequelize.INTEGER(10),
        allowNull:false,
        primaryKey : true,
        autoIncrement:true
    },
    name : { //
        type : Sequelize.STRING(20),
        allowNull : true
    },
    activeStartTimeTimestampText : {
        type : Sequelize.INTEGER(14),
        allowNull : true
    },
    activeEndTimeTimestampText : {
        type : Sequelize.INTEGER(14),
        allowNull : true
    },
    start_year : {
        type : Sequelize.INTEGER(4),
        allowNull : true
    },
    start_month : {
        type : Sequelize.INTEGER(2),
        allowNull : true
    },
    start_day : {
        type : Sequelize.INTEGER(2),
        allowNull : true
    },
    end_year : {
        type : Sequelize.INTEGER(4),
        allowNull : true
    },
    end_month : {
        type : Sequelize.INTEGER(2),
        allowNull : true
    },
    end_day : {
        type : Sequelize.INTEGER(2),
        allowNull : true
    },
    demand_url : {
        type : Sequelize.STRING(300),
        allowNull : true
    },
    operating_mid : {
        type : Sequelize.INTEGER(10),
        allowNull : true
    },
    design_mid : {
        type : Sequelize.INTEGER(10),
        allowNull : true
    },
    web_mid : {
        type : Sequelize.INTEGER(10),
        allowNull : true
    },
    server_mid : {
        type : Sequelize.INTEGER(10),
        allowNull : true
    },
    test_mid : {
        type : Sequelize.INTEGER(10),
        allowNull : true
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

Active.sync();

module.exports = Active;