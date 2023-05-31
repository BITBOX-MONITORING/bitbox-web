var express = require('express');
var router = express.Router();

var maquinaController = require('../controllers/maquinaController');

router.get('/selectMaquinas/:fkEmpresa', (req, res) => {
  maquinaController.selectMaquinas(req, res);
});

router.get('/selectTabs', (req, res) => {
  maquinaController.selectTabs(req, res);
});

router.delete('/excluirMaquina/:id_maquina', function (req, res) {
  maquinaController.excluirMaquina(req, res);
});
router.post('/atualizarMaquina/:id_maquina', function (req, res) {
  maquinaController.atualizarMaquina(req, res);
});

module.exports = router;
