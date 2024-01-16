const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conect = require("./database/database");
const pergunta = require("./database/pergunta");
const resposta = require("./database/resposta");
// const deletar = require("./database/deletar");

//Database

conect.authenticate().then(() => {
    console.log("Conexão feita com Banco de Dados.");
}).catch((error) => {
    console.log(error);
});

app.set('view engine', 'ejs');
app.use(express.static('public'))

//BodyParser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas

app.get("/", (req, res) => {
    pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render("index.ejs", {
            perguntas: perguntas
        });
    });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar.ejs");
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {          //array de respostas
                res.render("pergunta.ejs", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            res.redirect("/");
        };
    });
})

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.post("/pergunta/deletar", (req, res) => {
    var id = req.body.id;
    pergunta.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/");
    })
});

app.listen(8080, () => {
    console.log("Sistema funcionando.");
});