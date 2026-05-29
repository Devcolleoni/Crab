var adminModel = require("../models/adminModel");

// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         usuarioModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);

//                         aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
//                             .then((resultadoAquarios) => {
//                                 if (resultadoAquarios.length > 0) {
//                                     res.json({
//                                         id: resultadoAutenticar[0].id,
//                                         email: resultadoAutenticar[0].email,
//                                         nome: resultadoAutenticar[0].nome,
//                                         senha: resultadoAutenticar[0].senha,
//                                         aquarios: resultadoAquarios
//                                     });
//                                 } else {
//                                     res.status(204).json({ aquarios: [] });
//                                 }
//                             })
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

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




    module.exports = {
        buscar, aceitar
    }