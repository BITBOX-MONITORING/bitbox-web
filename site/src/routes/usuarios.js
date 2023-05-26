var express = require('express');
var router = express.Router();

var usuarioController = require('../controllers/usuarioController');

router.get('/', function (req, res) {
  usuarioController.testar(req, res);
});

router.get('/listar', function (req, res) {
  usuarioController.listar(req, res);
});

router.post('/cadastrar', function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post('/entrar', function (req, res) {
  usuarioController.entrar(req, res);
});

router.get('/selectFuncionarios/:fkEmpresa', (req, res) => {
  usuarioController.selectFuncionarios(req, res);
});

router.delete('/excluirFuncionario/:id_funcionario', function (req, res) {
  usuarioController.excluirFuncionario(req, res);
});

router.put('/atualizarFuncionario//:id_funcionario', function (req, res) {
  usuarioController.atualizarFuncionario(req, res);
});

module.exports = router;
