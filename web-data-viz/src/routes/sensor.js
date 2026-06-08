var express = require("express")
var router  = express.Router()

var sensorController = require("../controllers/sensorController")

router.get("/listarVaos/:idFilial", function(req, res) {
    sensorController.listarVaos(req, res)
})

router.post("/cadastrar", function(req, res) {
    sensorController.cadastrar(req, res)
})

router.get("/listarSensores/:idFilial", function(req, res) {
    sensorController.listarSensores(req, res)
})

module.exports = router