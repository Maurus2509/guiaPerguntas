const sequelize = require('sequelize');
const conect = require("./database");
const pergunta = require("./pergunta");
const resposta = require("./resposta");

// // const btn = document.querySelector("#btn");

// btn.addEventListener("click", (perguntaId) => {
//     pergunta.destroy({
//         where: {
//             id: perguntaId
//         }
//     })

//     resposta.destroy({
//         where: {
//             id: perguntaId
//         }
//     });

//     console.log("azulv")
// })