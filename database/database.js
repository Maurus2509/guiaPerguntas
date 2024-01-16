const sequelize = require('sequelize');

const conect = new sequelize('guiaPergunta', 'root', 'adm1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conect;