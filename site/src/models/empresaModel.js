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

function selectEmpresa(id_empresa) {
  console.log('ACESSEI O MODEL, VAMOS SELECIONAR AS EMPRESAS!');

  var instrucao = `
  SELECT Empresa.id_empresa, Empresa.nome, Empresa.cnpj, count(maq.id_maquina) as maquinas, count(func.id_funcionario) as funcionarios
  FROM Empresa JOIN Funcionario as func ON fk_empresa = id_empresa JOIN Maquina as maq ON fk_funcionario = id_funcionario
  WHERE Empresa.id_empresa = ${id_empresa}
  GROUP BY Empresa.id_empresa, Empresa.nome, Empresa.cnpj`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function selectEmpresas() {
  console.log('ACESSEI O MODEL, VAMOS SELECIONAR AS EMPRESAS!');

  var instrucao = `SELECT * FROM Empresa`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function excluirEmpresa(id_empresa) {
  console.log(
    "ACESSEI O avaliacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():"
  );
  var instrucao = `EXEC excluir_empresa ${id_empresa}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function atualizarEmpresa(nome, cnpj, fk_empresa) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    nome,
    cnpj,
    fk_empresa
  );
  var instrucao = `
  UPDATE Empresa SET nome = '${nome}', cnpj = '${cnpj}' WHERE id_empresa = ${fk_empresa};
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  cadastrar,
  selectEmpresa,
  selectEmpresas,
  excluirEmpresa,
  atualizarEmpresa,
};
