var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

// CREATE
router.post('/cadastrar', (req, res) => {
    empresaController.cadastrar(req, res)
})
// READ
router.get('/selectEmpresa/:id_empresa', (req, res) => {
    empresaController.selectEmpresa(req, res)
})
// DELETE
router.delete("/excluirEmpresa/:id_empresa", function (req, res) {
    empresaController.excluirEmpresa(req, res)
});
// UPDATE
router.post("/atualizarEmpresa/:id_empresa", function (req, res) {
    empresaController.atualizarEmpresa(req, res)
});

module.exports = router;