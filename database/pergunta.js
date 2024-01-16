const sequelize = require('sequelize');
const conect = require("./database");

const pergunta = conect.define('pergunta', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

pergunta.sync({ force: false }).then(() => { });

module.exports = pergunta;