var setorModel = require("../models/setorModel");

function cadastrar(req, res) {

    var nomeSetor = req.body.nomeSetorServer;
    var vaoInicial = req.body.vaoInicialServer;
    var vaoFinal = req.body.vaoFinalServer;

    setorModel.cadastrar(
        nomeSetor,
        vaoInicial,
        vaoFinal
    )
    .then(function(resultado) {
        res.status(200).json(resultado);
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function listar(req, res) {

    setorModel.listar()
    .then(function(resultado) {
        res.json(resultado);
    })
    .catch(function(erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function remover(req, res) {

    var idSetor = req.params.idSetor;

    setorModel.remover(idSetor)
    .then(function(resultado) {
        res.json(resultado);
    })
    .catch(function(erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {
    var idSetor = req.params.idSetor;
    var nome = req.body.nomeServer;

    setorModel.editar(idSetor, nome)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    listar,
    remover,
    editar
};