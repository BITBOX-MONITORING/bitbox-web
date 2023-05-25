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

function excluirEmpresa(id_empresa) {
  console.log("ACESSEI O avaliacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idEndereco);
  var instrucao = `
      DELETE FROM Empresa WHERE id_empresa = ${id_empresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function atualizarEmpresa(nome, cnpj) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    nome, cnpj
  );
  var instrucao = `
  UPDATE Empresa SET nome = '${nome}', cnpj = '${cnpj}';
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  selectEmpresas,
  excluirEmpresa,
  atualizarEmpresa
};
