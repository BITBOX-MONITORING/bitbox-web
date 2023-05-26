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
    <tr class="row" data-id="${funcionario.id_funcionario}">
    <td>${funcionario.id_funcionario}</td>
    <td class="funcionario-nome">${funcionario.nome}</td>
    <td class="funcionario-email">${funcionario.email}</td>
    <td>${funcionario.codigo_patrimonio}</td>
    <td>
      <i class="ph ph-pencil-simple" onclick="editFuncionario(${funcionario.id_funcionario})"></i>
      <i class="ph ph-trash" onclick="deleteFuncionario(${funcionario.id_funcionario})"></i>
    </td>
  </tr>`;
  });
}

function deleteFuncionario(id) {
  const confirm = window.confirm('❓ Deseja realmente excluir esse funcionário?');

  if (confirm) {
    fetch(`/usuarios/excluirFuncionario/${id}`, {
      method: 'DELETE',
    }).then(async (res) => {
      console.log(await res.json());
    });

    alert('Funcionário deletado com sucesso!');
    location.reload();
  }
}

function editFuncionario(id) {
  const nome = prompt('Digite o novo nome do funcionário:');
  const email = prompt('Digite o novo email do funcionário:');

  const data = {
    nome: nome,
    email: email,
  };

  fetch(`/usuarios/atualizarFuncionario/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        const funcionarioRow = document.querySelector(`tr[data-id="${id}"]`);
        funcionarioRow.querySelector('.funcionario-nome').textContent = data.nome;
        funcionarioRow.querySelector('.funcionario-email').textContent = data.email;
      }
    })
    .catch((error) => {
      console.error('Ocorreu um erro:', error);
    });
}
