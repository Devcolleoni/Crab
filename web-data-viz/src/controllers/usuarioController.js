var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                    res.json({
                        id: resultadoAutenticar[0].id,
                        email: resultadoAutenticar[0].email,
                        senha: resultadoAutenticar[0].senha,
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {

    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeVar = req.body.nomeServer
    var cpfVar = req.body.cpfServer;
    var emailVar = req.body.emailServer;
    var razaoSocialVar = req.body.razaoSocialServer;
    var cnpjVar = req.body.cnpjServer;

    // Faça as validações dos valores
    if (nomeVar == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpfVar == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (emailVar == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (razaoSocialVar == undefined) {
        res.status(400).send("Sua razão social está undefined!");
    } else if (cnpjVar == undefined) {
        res.status(400).send("Sua CNPJ está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeVar, cpfVar, emailVar, razaoSocialVar, cnpjVar)
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

module.exports = {
    autenticar,
    cadastrar
}