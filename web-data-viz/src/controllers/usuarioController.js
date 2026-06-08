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
                        id_filiais: resultadoAutenticar[0].id_filiais,
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
        })
};

function autenticar2(req, res) {
    var id_filial = req.body.id_filialServer;
    var id_matriz = req.body.id_matrizServer;

    if (id_filial == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (id_matriz == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(id_filial, id_matriz)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                if (resultadoAutenticar.length == 1) {
                    console.log(resultadoAutenticar);
                   res.json({
                  nomeSetor: resultadoAutenticar[0].nome_setor,
                  qtdVaos: resultadoAutenticar[0].quantidade_vaos,
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


function cadastrarFuncionario(req, res) {


    let nome = req.body.nomeServer;
    let cpf = req.body.cpfServer;
    let email = req.body.emailServer;
    let senha = req.body.senhaServer;
    let cargo = req.body.cargoServer;
    let filial = req.body.filialServer;

    if (
        nome == undefined ||
        cpf == undefined ||
        email == undefined ||
        senha == undefined
    ) {
        res.status(400).send("Dados inválidos");
        return;
    }

    usuarioModel.cadastrarFuncionario(
        nome,
        cpf,
        email,
        senha,
        cargo,
        filial
    )
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function listarFiliais(req, res){

    let idMatriz = req.params.idMatriz;

    usuarioModel.listarFiliais(idMatriz)
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro);
        });
}


module.exports = {
    autenticar,
    autenticar2,
    cadastrar,
    Atualizar,
    cadastrarFuncionario,
    listarFiliais
}