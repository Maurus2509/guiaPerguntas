const sequelize = require("sequelize");
const conect = require("./database");

const resposta = conect.define("respostas", {
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

resposta.sync({ force: false }); // Sincronizar com o banco de dados e não criar a tabela caso exista

module.exports = resposta;