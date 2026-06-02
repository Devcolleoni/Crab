var express = require("express");
var router = express.Router();

var gerenciamentoFilialController = require('../controllers/gerenciamentoFilialController');

router.post("/cadastrarFilial", function (req, res) {
    gerenciamentoFilialController.cadastrarFilial(req, res)
})

router.post("/cadastrarResponsavel", function (req, res) {
    gerenciamentoFilialController.cadastrarResponsavel(req, res)
})

router.get("/listarFiliais/:idMatriz", function(req, res) {
    gerenciamentoFilialController.listarFiliais(req, res)
})

module.exports = router;