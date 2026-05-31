var adminModel = require("../models/adminModel");


    function buscar(req, res) {
        adminModel.buscar().then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

    function aceitar(req, res) {
    var nomeVar = req.body.nomeServer;
    var cpfVar = req.body.cpfServer;
    var emailVar = req.body.emailServer;
    var razao_socialVar = req.body.razaoServer;
    var cnpjVar = req.body.cnpjServer;

    if (nomeVar == undefined || cpfVar == undefined || emailVar == undefined || razao_socialVar == undefined || cnpjVar == undefined) {
        res.status(400).send("Seus dados estão undefined! Verifique o corpo da requisição.");
        return;
    }

    adminModel.aceitar(nomeVar, cpfVar, emailVar, razao_socialVar, cnpjVar)
        .then(function (resultado) {
            console.log("Cadastro aceito e distribuído com sucesso!");
            res.status(201).json({ 
                mensagem: "Usuário e Matriz criados com sucesso!",
                resultado: resultado 
            });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a inserção dos dados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


    function recusar(req, res) {
    var cpfVar = req.body.cpfServer;

    if ( cpfVar == undefined) {
        res.status(400).send("Seus dados estão undefined! Verifique o corpo da requisição.");
        return;
    }

    adminModel.recusar(cpfVar)
        .then(function (resultado) {
            console.log("Cadastro recusado e excluído com sucesso!");
            res.status(201).json({ 
                mensagem: "Cadastro recusado com sucesso!",
                resultado: resultado 
            });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a inserção dos dados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}



    module.exports = {
        buscar, aceitar, recusar
    }