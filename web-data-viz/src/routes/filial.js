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

router.get("/listarResponsaveis/:idMatriz", function (req, res) {
    gerenciamentoFilialController.listarResponsaveis(req, res)
})

router.post("/vincularResponsavel", function (req, res) {
    gerenciamentoFilialController.vincularResponsavel(req, res)
})

module.exports = router;