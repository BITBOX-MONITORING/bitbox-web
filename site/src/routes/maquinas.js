var express = require("express");
var router = express.Router();

// ESTA CRIANDO A MAQUINA PELO NOSSO JAR

var maquinaController = require("../controllers/maquinaController");
// READ
router.get('/selectMaquinas/:fkEmpresa', (req, res) => {
    maquinaController.selectMaquinas(req, res)
})
// DELETE
router.delete("/excluirMaquina/:id_maquina", function (req, res) {
    maquinaController.excluirMaquina(req, res)
});
// UPDATE
router.post("/atualizarMaquina/:id_maquina", function (req, res) {
    maquinaController.atualizarMaquina(req, res)
});

module.exports = router;