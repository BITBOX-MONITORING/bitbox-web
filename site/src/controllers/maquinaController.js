var maquinaModel = require('../models/maquinaModel');

function selectMaquinas(req, res) {
  maquinaModel.selectMaquinas()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

function excluirMaquina(req, res) {
  var id_maquina = req.params.id_maquina;

  maquinaModel.excluirMaquina(id_maquina)
      .then(
          function (resultado) {
              res.json(resultado);
          }
      )
      .catch(
          function (erro) {
              console.log(erro);
              console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
              res.status(500).json(erro.sqlMessage);
          }
      );
}

module.exports = {
  selectMaquinas,
  excluirMaquina
};
