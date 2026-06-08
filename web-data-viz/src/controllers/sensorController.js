var sensorModel = require("../models/sensorModel")

function listarVaos(req, res) {
    let idFilial = req.params.idFilial

    sensorModel.listarVaos(idFilial)
        .then(function(resultado) {
            res.json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function cadastrar(req, res) {
    let idVao        = req.body.idVaoServer
    let dtInstalacao = req.body.dtInstalacaoServer
    let status       = req.body.statusServer

    if (!idVao || !dtInstalacao || !status) {
        res.status(400).send("Preencha todos os campos!")
        return
    }

    sensorModel.cadastrar(idVao, dtInstalacao, status)
        .then(function(resultado) {
            res.status(200).json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

function listarSensores(req, res) {
    let idFilial = req.params.idFilial

    sensorModel.listarSensores(idFilial)
        .then(function(resultado) {
            res.json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}

module.exports = {
    listarVaos,
    cadastrar,
    listarSensores
}