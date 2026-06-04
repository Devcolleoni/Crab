var express = require("express");
var router = express.Router();


var dashController = require("../controllers/dashController")


router.get("/entrada", function (req, res) {
    dashController.entrada(req, res);
});

router.get("/entrada2", function (req, res) {
    dashController.entrada2(req, res);
});

module.exports = router;
