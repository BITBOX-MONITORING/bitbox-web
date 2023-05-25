var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// CREATE
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})
// READ
router.post("/entrar", function (req, res) {
    usuarioController.entrar(req, res)
});
// DELETE
router.delete("/excluirFuncionario:id_funcionario", function (req, res) {
    usuarioController.excluirFuncionario(req, res)
});
// READ
router.get("/selectFuncionarios/:fkEmpresa", (req, res) => {
    usuarioController.selectFuncionarios(req, res)
})

// UPDATE
router.post("/atualizarFuncionario:id_funcionario", function (req, res) {
    usuarioController.atualizarFuncionario(req, res)
});

module.exports = router;