var empresaModel = require('../models/empresaModel');

function selectEmpresas(req, res) {
  empresaModel.selectEmpresas()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

function cadastrar(req, res) {
  console.log('CHEGAMOS NA CONTROLLER PORA!');
  var nome = req.body.nomeServer;
  var cnpj = req.body.cnpjServer;

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (cnpj == undefined) {
    res.status(400).send('Seu cnpj está undefined!');
  } else {
    empresaModel
      .cadastrar(nome, cnpj)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log('\nHouve um erro ao realizar o cadastro! Erro: ', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function excluirEmpresa(req, res) {
  var id_empresa = req.params.id_empresa;

  empresaModel.excluirEmpresa(id_empresa)
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

function atualizarEmpresa(req, res) {
  var nome = req.body.nomeServer;
  var cnpj = req.body.cnpjServer;

  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (cnpj == undefined) {
    res.status(400).send('Sua cnpj está indefinida!');
  } else {
    empresaModel
      .atualizarEmpresa(nome, cnpj)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send('Nome ou cnpj inválido(s)');
        } else {
          res.status(403).send('Duplicata!');
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log('\nHouve um erro ao atualizar a empresa! Erro: ', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrar,
  selectEmpresas,
  excluirEmpresa,
  atualizarEmpresa
};
