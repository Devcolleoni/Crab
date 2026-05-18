var express = require("express");
var router = express.Router();


var dashController = require("../controllers/dashController")


router.get("/entrada", function (req, res) {
    dashController.entrada(req, res);
});

module.exports = router;
