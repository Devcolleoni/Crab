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
                  id_usuario: resultadoAutenticar[0].id_usuario,
                  nome: resultadoAutenticar[0].nome,
                  email: resultadoAutenticar[0].email,
                  id_cargo: resultadoAutenticar[0].id_cargo,
                  id_filial: resultadoAutenticar[0].id_filial,
                  id_matriz: resultadoAutenticar[0].id_matriz
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

    
    let nomeVar = req.body.nomeServer
    let cpfVar = req.body.cpfServer;
    let emailVar = req.body.emailServer;
    let razaoSocialVar = req.body.razaoSocialServer;
    let cnpjVar = req.body.cnpjServer;

    
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

  function Atualizar(req, res) {
    let SenhaVar = req.body.NovaServer;
    let idVar = req.body.idServer;
    let Antigavar = req.body.AntigaServer
    let Emailvar = req.body.EmailServer

    usuarioModel.Atualizar(SenhaVar, idVar, Antigavar, Emailvar)
        .then(function (resultado) {
            console.log("Senha atualizada!");
            res.status(201).json({ 
                mensagem: "Senha atualizada com sucesso!",
                resultado: resultado 
            });
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a inserção dos dados: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })};






module.exports = {
    autenticar,
    cadastrar,
    Atualizar
}