var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/buscar", function (req, res) {
    adminController.buscar(req, res);
})

module.exports = router;