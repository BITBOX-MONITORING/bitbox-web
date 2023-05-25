var database = require('../database/config');

function selectMaquinas() {
  console.log('ACESSEI O MODEL, VAMOS SELECIONAR AS MÁQUINAS!');

  var instrucao = `
  SELECT
  employee.id_usuario,
  employee.nome,
  (
      SELECT 
          device.id_maquina,
          device.sistema_operacional,
          device.fabricante,
          device.arquitetura,
          device.codigo_patrimonio
      FROM Maquina as device
      WHERE device.fk_funcionario = employee.id_usuario 
      FOR JSON PATH   
  ) AS device,
  (
      SELECT
          data.cpu_uso,
          data.ram_uso,
          data.ram_disponivel,
          (data.rede_download + data.rede_upload) / 2 AS rede
      FROM Registro AS data
      WHERE data.fk_maquina = device.id_maquina
      FOR JSON PATH
  ) AS data
FROM
  Usuario AS employee
  JOIN Maquina AS device ON device.fk_funcionario = employee.id_usuario
  JOIN Registro AS data ON data.fk_maquina = device.id_maquina
GROUP BY
  employee.id_usuario,
  employee.nome,
  device.id_maquina`;
  
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function excluirMaquina(id_maquina) {
  console.log("ACESSEI O avaliacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idEndereco);
  var instrucao = `
      DELETE FROM Maquina WHERE id_maquina = ${id_maquina};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
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
  excluirMaquina,
  atualizarMaquina
};
