var dashModel = require('../models/dashModel')


function entrada(req, res) {
        dashModel.entrada()
            .then(function(resultado) {
                res.status(200).json(resultado)
            })
            .catch(function(erro) {
                console.log(erro)
                res.status(500).send('Erro ao pegar a entrada e saida')
            })
    }


    module.exports = {
        
        entrada

    };
    