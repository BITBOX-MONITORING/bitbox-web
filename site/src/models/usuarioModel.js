var database = require('../database/config');

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );
  var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function cadastrar(nome, cargo, email, senha, codigoPatrimonio, fkEmpresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    email,
    senha,
    cargo,
    codigoPatrimonio,
    fkEmpresa
  );

  //   var fkNOC =
  //     cargo != 'Suporte'
  //       ? `SELECT id_usuario FROM Usuario WHERE fk_noc IS NULL AND fk_empresa = ${fkEmpresa}`
  //       : 'null';

  var instrucao = `
        INSERT INTO usuario (nome, email, senha, fk_noc, fk_empresa) VALUES
        ('${nome}', '${email}', '${senha}', null, ${fkEmpresa});
    `;

  //   var fkFuncionario = `SELECT id_usuario FROM Usuario WHERE email = '${email}'`;

  //   var insertMaquina = `INSERT INTO Maquina (fk_funcionario) VALUES (${fkFuncionario}) `;

  console.log('Executando a instrução SQL: \n' + instrucao);

  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrar,
};
