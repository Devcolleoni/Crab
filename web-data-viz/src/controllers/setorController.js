    var setorModel = require("../models/setorModel");

    function cadastrar(req, res) {
        let nomeSetor = req.body.nomeSetorServer;
        let vaoInicial = Number(req.body.vaoInicialServer);
        let vaoFinal = Number(req.body.vaoFinalServer);
                
        if (nomeSetor == undefined || nomeSetor == "") {
            res.status(400).send("O nome do setor está inválido!");
        } else if (isNaN(vaoInicial) || isNaN(vaoFinal)) {
            res.status(400).send("Os vãos inicial e final precisam ser números válidos!");
        } else {
        
            setorModel.cadastrar(nomeSetor, vaoInicial, vaoFinal, idFilial, idMatriz)
            .then(function(resultado) {
                res.status(200).json(resultado);
            })
            .catch(function(erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
        }
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
        let idSetor = req.params.idSetor;

        setorModel.remover(idSetor)
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json(erro.sqlMessage);
        });
    }

    function editar(req, res) {
        let idSetor = req.params.idSetor;
        let nome = req.body.nomeServer;

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