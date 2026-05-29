var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.get  ("/buscar", function (req, res) {
    adminController.buscar(req, res);
})

router.post  ("/aceitar", function (req, res) {
    adminController.aceitar(req, res);
})

module.exports = router;