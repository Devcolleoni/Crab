const filialModel = require("../models/filialModel")

function cadastrarFilial(req, res) {

    // Crie uma variável que vá recuperar os valores do arquivo gerenciamento-matriz.html
    var razaoSocialVar = req.body.razaoSocialServer;
    var cnpjVar = req.body.cnpjServer;
    var cepVar = req.body.cepServer;

    var idMatrizVar = req.body.idMatrizServer
    console.log(req.body)
    console.log("ID MATRIZ:", idMatrizVar)


    var idMatrizVar = req.body.idMatriz
    


    // Faça as validações dos valores
    if (razaoSocialVar == undefined) {
        res.status(400).send("Sua Razão social está undefined!");
    } else if (cnpjVar == undefined) {
        res.status(400).send("Seu CNPJ está undefined!");
    } else if (cepVar == undefined) {
        res.status(400).send("Seu CEP está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo filialModel.js
        filialModel.cadastrarFilial(razaoSocialVar, cnpjVar, cepVar, idMatrizVar)
            .then(function (resultado) {

                console.log("Resultado do insert:", resultado);

                res.json({
                    idFilial: resultado.insertId
                });

            })
            .catch(
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

function cadastrarResponsavel(req, res) {

    // Crie uma variável que vá recuperar os valores do arquivo gerenciamento-matriz.html
    var nomeVar = req.body.nomeResponsavelServer;
    var cpfVar = req.body.cpfResponsavelServer;
    var emailVar = req.body.emailResponsavelServer;
    var senhaVar = req.body.senhaResponsavelServer;
    var idMatrizVar = req.body.idMatrizServer;
    var idFilialVar = req.body.idFilialServer;

    // Faça as validações dos valores
    if (nomeVar == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (cpfVar == undefined) {
        res.status(400).send("O CPF está undefined!");
    } else if (emailVar == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (senhaVar == undefined) {
        res.status(400).send("A senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo filialModel.js
        filialModel.cadastrarResponsavel(nomeVar, cpfVar, emailVar, senhaVar, idMatrizVar, idFilialVar)
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

function listarFiliais(req, res) {

    let idMatriz = req.params.idMatriz

    filialModel.listarFiliais(idMatriz)

        .then(function (resultado) {
            res.status(200).json(resultado)
        })
        .catch(function (erro) {
            console.log(erro)
            res.status(500).json(erro.sqlMessage)
        })
}


module.exports = {
    cadastrarFilial,
    cadastrarResponsavel,
    listarFiliais
}