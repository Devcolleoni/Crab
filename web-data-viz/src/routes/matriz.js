var express = require("express");
var router = express.Router();

var matrizController = require("../controllers/matrizController");

router.get("/listarPainelFiliais/:idMatriz", function (req, res) {
    matrizController.listarPainelFiliais(req, res);
});

module.exports = router;
