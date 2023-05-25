var usuarioModel = require('../models/usuarioModel');

function entrar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está indefinida!');
  } else {
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send('Email e/ou senha inválido(s)');
        } else {
          res.status(403).send('Mais de um usuário com o mesmo login e senha!');
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log('\nHouve um erro ao realizar o login! Erro: ', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nome = req.body.nameServer;
  var cargo = req.body.officeServer.toLowerCase();
  var email = req.body.emailServer;
  var senha = req.body.passServer;
  var codigoPatrimonio = req.body.codigoPatrimonioServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  console.log(nome, cargo, email, senha, codigoPatrimonio, fkEmpresa);

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined!');
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined!');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined!');
  } else if (cargo == undefined) {
    res.status(400).send('Sua cargo está undefined!');
  } else if (fkEmpresa == undefined) {
    res.status(400).send('Sua fkEmpresa está undefined!');
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrar(nome, cargo, email, senha, codigoPatrimonio, fkEmpresa)
      .then(function (resultado) {
        console.log(resultado);
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log('\nHouve um erro ao realizar o cadastro! Erro: ', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function excluirFuncionario(req, res) {
  var id_funcionario = req.params.id_funcionario;

  usuarioModel.excluirFuncionario(id_funcionario)
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
  entrar,
  cadastrar,
  excluirFuncionario
};
