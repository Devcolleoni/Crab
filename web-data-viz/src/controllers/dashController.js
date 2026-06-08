var dashModel = require('../models/dashModel')


function entrada(req, res) {
    let idFilial = req.body.idFilial
    let idMatriz = req.body.idMatriz;
    
    if (idFilial == undefined) {
        res.status(400).send("Seu idFilial está undefined!");
    } else if (idMatriz == undefined) {
        res.status(400).send("Seu idMatriz está undefined!");
    } else {

        dashModel.entrada(idFilial, idMatriz)
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

function entrada2(req, res) {
    dashModel.entrada2()
        .then(function(resultado) {
            res.status(200).json(resultado)
        })
        .catch(function(erro) {
            console.log(erro)
            res.status(500).send('Erro ao pegar a entrada e saida')
        })

}
function entrada3(req, res) {
    let idFilial = req.body.idFilial
    let idMatriz = req.body.idMatriz;
    
    if (idFilial == undefined) {
        res.status(400).send("Seu idFilial está undefined!");
    } else if (idMatriz == undefined) {
        res.status(400).send("Seu idMatriz está undefined!");
    } else {
        dashModel.entrada3(idFilial, idMatriz)
            .then(function (resultado) {
                res.json(resultado[0] || null);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function entrada2PorSetor(req, res) {
    const idSetor = req.query.idSetor || 'Geral';
    const idFilial = req.query.idFilial;
    const idMatriz = req.query.idMatriz;

    if (!idFilial || !idMatriz) {
        return res.status(400).send("idFilial ou idMatriz undefined!");
    }

    dashModel.entrada2PorSetor(idFilial, idMatriz, idSetor)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send('Erro ao buscar ociosidade por setor');
        });
}

function entradaPorSetor(req, res) {
    const { idFilial, idMatriz, idSetor } = req.body;

    if (!idFilial || !idMatriz) {
        return res.status(400).send("idFilial ou idMatriz undefined!");
    }

    dashModel.entradaPorSetor(idFilial, idMatriz, idSetor || 'Geral')
        .then(function(resultado) {
            res.json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}
function ociosidadePorSetor(req, res) {
    const { idFilial, idMatriz } = req.body;

    if (!idFilial || !idMatriz) {
        return res.status(400).send("idFilial ou idMatriz undefined!");
    }

    dashModel.ociosidadePorSetor(idFilial, idMatriz)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send('Erro ao buscar ociosidade por setor');
        });
}
function abastecimentoRosca(req, res) {
    const { idFilial, idMatriz, idSetor } = req.body;

    if (!idFilial || !idMatriz) {
        return res.status(400).send("idFilial ou idMatriz undefined!");
    }

    dashModel.abastecimentoRosca(idFilial, idMatriz, idSetor || 'Geral')
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).send('Erro ao buscar abastecimento rosca');
        });
}

module.exports = {
    entrada,
    entrada2,
    entrada3,
    entrada2PorSetor,
    entradaPorSetor,
    ociosidadePorSetor,
    abastecimentoRosca,
};
    