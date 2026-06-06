var matrizModel = require("../models/matrizModel");

function listarPainelFiliais(req, res) {
    var idMatriz = req.params.idMatriz;

    matrizModel.listarPainelFiliais(idMatriz)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o painel de filiais: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarPainelFiliais
};
