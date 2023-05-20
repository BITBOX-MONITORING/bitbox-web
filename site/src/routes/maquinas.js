var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get('/selectMaquinas', (req, res) => {
    maquinaController.selectMaquinas(req, res)
})

module.exports = router;