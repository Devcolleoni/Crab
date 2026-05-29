const filialModel = require("../models/filialModel")

function cadastrarFilial(req, res) {

    // Crie uma variável que vá recuperar os valores do arquivo gerenciamento-matriz.html
    var razaoSocialVar = req.body.razaoSocialServer;
    var cnpjVar = req.body.cnpjServer;
    var cepVar = req.body.cepServer;
    

    // Faça as validações dos valores
    if (razaoSocialVar == undefined) {
        res.status(400).send("Sua Razão social está undefined!");
    } else if (cnpjVar == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else if (cepVar == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo filialModel.js
        filialModel.cadastrarFilial(razaoSocialVar, cnpjVar, cepVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

/* function cadastrarGerente(req, res) {

    // Crie uma variável que vá recuperar os valores do arquivo gerenciamento-matriz.html
    var nomeVar = req.body.razaoSocialServer;
    var cpfVar = req.body.cpfServer;
    var emailVar = req.body.emailVar;
    var senhaVar = req.body.senhavar;

    // Faça as validações dos valores
    if (nomeVar == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cpfjVar == undefined) {
        res.status(400).send("O CPF está undefined!");
    } else if (emailVar == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (senhaVar == undefined) {
        res.status(400).send("A senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo filialModel.js
        Model.cadastrarGerente(nomeVar, cpfVar, emailVar, senhaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
    */

module.exports = {
    cadastrarFilial
}