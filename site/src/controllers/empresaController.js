var empresaModel = require('../models/empresaModel');

console.log(empresaModel);

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

module.exports = {
  cadastrar,
  selectEmpresas
};
