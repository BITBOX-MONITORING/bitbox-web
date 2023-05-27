var database = require('../database/config');

function entrar(email, senha) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha
  );

  var instrucao = ` SELECT * FROM funcionario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'engenheiro noc'; `;
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

  var instrucao = `EXEC cadastrar_funcionario '${nome}', '${email}', '${senha}', '${cargo}', ${codigoPatrimonio}, ${fkEmpresa};`;

  console.log('Executando a instrução SQL: \n' + instrucao);

  return database.executar(instrucao);
}

function excluirFuncionario(id_funcionario) {
  console.log("ACESSEI O excluirFuncionario");

  var instrucao = `EXEC excluir_funcionario ${id_funcionario}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function selectFuncionarios(fkEmpresa) {
  console.log('ACESSEI A MODEL SELECT FUNCIONARIOS ' + fkEmpresa);

  instrucao = `SELECT func.*, maq.codigo_patrimonio FROM Funcionario as func
  JOIN Maquina as maq ON fk_funcionario = id_funcionario
  WHERE fk_empresa = ${fkEmpresa};`;

  console.log('Executando a instrução SQL: \n' + instrucao);

  return database.executar(instrucao);
}

function atualizarFuncionario(nome, email, id) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    nome,
    email,
    id
  );
  var instrucao = `
    UPDATE Funcionario SET nome = '${nome}', email = '${email}'
    WHERE id_funcionario = ${id};
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  entrar,
  cadastrar,
  excluirFuncionario,
  selectFuncionarios,
  atualizarFuncionario,
};
