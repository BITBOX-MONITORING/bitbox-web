var express = require("express");
var router = express.Router();

var maquinaController = require("../controllers/maquinaController");

router.get('/selectMaquinas', (req, res) => {
    maquinaController.selectMaquinas(req, res)
})

router.delete("/excluirMaquina:id_maquina", function (req, res) {
    maquinaController.excluirMaquina(req, res)
});

module.exports = router;