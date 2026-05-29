var express = require("express");
var router = express.Router();

var gerenciamentoFilialController = require('../controllers/gerenciamentoFilialController');

router.post("/cadastrarFilial", function (req, res) {
    gerenciamentoFilialController.cadastrarFilial(req, res)
})

module.exports = router;