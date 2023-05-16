var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post('/cadastrar', (req, res) => {
    empresaController.cadastrar(req, res)
})

router.get('/selectEmpresas', (req, res) => {
    empresaController.selectEmpresas(req, res)
})

module.exports = router;