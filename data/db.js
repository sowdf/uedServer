const ormconfig = require('../ormconfig.json');
const Sequelize = require('sequelize');
let {database,username,password,host,dialect,pool} = ormconfig;
const sequelize = new Sequelize(database,username , password, {
    host: host,
    dialect: dialect,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    pool: {
        max: pool.max,
        min: pool.min,
        acquire: pool.acquire,
        idle: pool.idle
    }
});

module.exports = sequelize;