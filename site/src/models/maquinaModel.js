var database = require('../database/config');

function selectMaquinas(fkEmpresa) {
  console.log('ACESSEI O MODEL, VAMOS SELECIONAR AS MÁQUINAS!');

  var instrucao = `SELECT id_funcionario, nome, device, data FROM vwMaquinaInfo WHERE fk_empresa = ${fkEmpresa};`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function selectTabs() {
  console.log('ACESSEI O MODEL, VAMOS SELECIONAR AS ABAS!');

  var instrucao = `SELECT * FROM AbasNavegador`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}


function excluirMaquina(id_maquina) {
  console.log(
    "ACESSEI O avaliacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():"
  );
  var instrucao = `EXEC excluir_maquina ${id_maquina}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function atualizarMaquina(fk_funcionario) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    fk_funcionario
  );
  var instrucao = `
  UPDATE Funcionario SET fk_funcionario = '${fk_funcionario}';
    `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  selectMaquinas,
  selectTabs,
  excluirMaquina,
  atualizarMaquina,
};
