var express = require("express");
var router = express.Router();

var setorController = require("../controllers/setorController");

router.post("/cadastrar", function(req, res) {
    setorController.cadastrar(req, res);
});

router.get("/listar/:idFilial", function(req, res) {
    setorController.listar(req, res);
});

router.delete("/remover/:idSetor", function(req, res) {
    setorController.remover(req, res);
});

router.put("/editar/:idSetor", setorController.editar);

module.exports = router;