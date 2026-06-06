var setorModel = require("../models/setorModel");

function cadastrar(req, res) {

    let nomeSetor = req.body.nomeSetorServer;
    let vaoInicial = req.body.vaoInicialServer;
    let vaoFinal = req.body.vaoFinalServer;
    let idFilial = req.body.idFilialServer;
    let idMatriz = req.body.idMatrizServer;

    setorModel.cadastrar(
        nomeSetor,
        vaoInicial,
        vaoFinal, 
        idFilial,
        idMatriz
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