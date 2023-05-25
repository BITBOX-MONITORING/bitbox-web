let funcionarios;

(async function () {
  const response = await fetch('/usuarios/selectFuncionarios/1', {});
  funcionarios = await response.json()
  console.log(funcionarios);

  if (funcionarios) {
    buildListFuncionarios();
  }
})();

function buildListFuncionarios() {
  funcionarios.forEach((funcionario) => {
    listFuncionarios.innerHTML += `
    <tr class="row">
    <th>${funcionario.id_funcionario}</th>
    <th>${funcionario.nome}</th>
    <th>${funcionario.email}</th>
    <th>${funcionario.codigo_patrimonio}</th>
    <th>
      <i class="ph ph-pencil-simple" onclick="editFuncionario(${funcionario.id_funcionario})"></i>
      <i class="ph ph-trash" onclick="deleteFuncionario(${funcionario.id_funcionario})"></i>
    </th>
  </tr>`;
  });
}

function deleteFuncionario(id) {
  const confim = window.confirm("Realmente deseja excluir?")
  if(confirm) {
    fetch (`/usuarios/excluirFuncionario/${id}`, {
      method: 'DELETE'
    }).then((res)=>{console.log(res)})
  }
  console.log(id);
}

function editFuncionario(id) {
  console.log(id);
}
