var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/Atualizar", function (req, res){
    usuarioController.Atualizar(req, res)
})

<<<<<<< Updated upstream
router.post("/autenticar2", function (req, res) {
    usuarioController.autenticar(req, res);
});
=======
router.post("/cadastrarFuncionario", function(req, res){
    usuarioController.cadastrarFuncionario(req, res);
});

router.get("/filiais/:idMatriz", function(req, res){
    usuarioController.listarFiliais(req, res);
});

>>>>>>> Stashed changes
module.exports = router;