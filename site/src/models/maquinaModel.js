var database = require('../database/config');

function selectEmpresas() {
  console.log('ACESSEI O MODEL, VAMOS SELECIONAR AS MÁQUINAS!');

  var instrucao = `
  SELECT
  employee.id_usuario,
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
  device.id_maquina
FOR JSON PATH;`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  selectMaquina,
};
