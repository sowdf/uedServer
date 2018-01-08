const db = require('../data/db');
const Sequelize = require('sequelize');

const UserInfo = db.define('userInfo',{
    uid : {
        type : Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true
    },
    gid : {
        type : Sequelize.INTEGER(11),
        allowNull: true,
    },
    dutyid : {
        type : Sequelize.INTEGER(11),
        defaultValue: 1,
    },
    isAdmin : {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    isWorking : {
        type: Sequelize.INTEGER(1),
        defaultValue: 1
    },
    avatar : {
        type : Sequelize.STRING(300),
        defaultValue : 'https://fs.img4399.com/ma~330_20171223205547_5a3e52537158c.jpeg?t=1514033747'
    },
    motto : { //人生格言
        type : Sequelize.STRING(300),
        defaultValue : '夫祸患常积于忽微，而智勇多困于所溺，岂独伶人也哉'
    },
    leaveTime : {
        type : Sequelize.STRING(100),
        defaultValue :  new Date().toString()
    },
    inTheTime : {//加入时间
        type : Sequelize.STRING(100),
        defaultValue :  new Date().toString()
    },
    username : { // 用户名
        type : Sequelize.STRING(30),
        defaultValue :  ''
    },
    workNumber : {
        type : Sequelize.INTEGER(11),
        allowNull : true
    },
    email : {
        type : Sequelize.STRING(100),
        allowNull: true,
    }
},{
    freezeTableName : true,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
UserInfo.sync();



module.exports = UserInfo;


