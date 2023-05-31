var maquinaModel = require('../models/maquinaModel');

function selectMaquinas(req, res) {
  const fkEmpresa = req.params.fkEmpresa

  maquinaModel.selectMaquinas(fkEmpresa)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

function selectTabs(req, res) {

  maquinaModel.selectTabs()
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

function atualizarMaquina(req, res) {
  var fk_funcionario = req.body.fk_funcionarioServer;

  if (fk_funcionario == undefined) {
    res.status(400).send('Seu fk_funcionario está undefined!');
  } else {
    maquinaModel
      .atualizarMaquina(fk_funcionario)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send('fk_funcionario inválido(s)');
        } else {
          res.status(403).send('Duplicata!');
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log('\nHouve um erro ao atualizar a fk_funcionario! Erro: ', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  selectMaquinas,
  selectTabs,
  excluirMaquina,
  atualizarMaquina,
};
