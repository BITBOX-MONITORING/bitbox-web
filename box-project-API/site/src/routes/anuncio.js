var express = require("express");
var router = express.Router();

var anuncioController = require("../controllers/anuncioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarAnuncio", function (req, res) {
    anuncioController.cadastrarAnuncio(req, res);
})

router.get("/listarAnuncio", function (req, res) {
    anuncioController.listarAnuncio(req, res);
});

module.exports = router;