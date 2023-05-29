var empresaModel = require('../models/empresaModel');

function selectEmpresa(req, res) {
  const id_empresa = req.params.id_empresa;
  empresaModel
    .selectEmpresa(id_empresa)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

function selectEmpresas(req, res) {
  empresaModel
    .selectEmpresas()
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

  empresaModel
    .excluirEmpresa(id_empresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao deletar o post: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function atualizarEmpresa(req, res) {
  var fk_empresa = req.params.id_empresa;
  var nome = req.body.nome;
  var cnpj = req.body.cnpj;

  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (cnpj == undefined) {
    res.status(400).send('Sua cnpj está indefinida!');
  } else if (fk_empresa == undefined) {
    res.status(400).send('Sua fk_empresa está indefinida!');
  } else {
    empresaModel
      .atualizarEmpresa(nome, cnpj, fk_empresa)
      .then(function (resultado) {
        console.log(resultado);
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
  selectEmpresa,
  selectEmpresas,
  excluirEmpresa,
  atualizarEmpresa,
};
