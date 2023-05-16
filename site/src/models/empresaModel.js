var database = require('../database/config');

function cadastrar(nome, cnpj) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    cnpj
  );

  var instrucao = `
        INSERT INTO empresa (nome, cnpj) VALUES ('${nome}', '${cnpj}');
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function selectEmpresas() {
  console.log("ACESSEI O MODEL, VAMOS SELECIONAR AS EMPRESAS!")

  var instrucao = `SELECT * FROM Empresa ORDER BY nome ASC;`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  selectEmpresas
};
