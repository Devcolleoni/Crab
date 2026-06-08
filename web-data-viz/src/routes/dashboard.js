var express = require("express");
var router = express.Router();


var dashController = require("../controllers/dashController")


router.post("/entrada", function (req, res) {
    dashController.entrada(req, res);
});

router.get("/entrada2", function (req, res) {
    dashController.entrada2(req, res);
});

router.post("/entrada3", function (req, res) {
    dashController.entrada3(req, res);
});

router.get("/entrada2porsetor", function (req, res) {
    dashController.entrada2PorSetor(req, res);
});

router.post("/entradaporsetor", function (req, res) {
    dashController.entradaPorSetor(req, res);
});

router.post("/ociosidadeporsetor", function (req, res) {
    dashController.ociosidadePorSetor(req, res);
});

router.post("/abastecimentorosca", function (req, res) {
    dashController.abastecimentoRosca(req, res);
});

module.exports = router;
