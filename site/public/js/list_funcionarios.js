let funcionarios;
let modal;
let inputNome;
let inputEmail;

(async function () {
  const response = await fetch('/usuarios/selectFuncionarios/1', {});
  funcionarios = await response.json();
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
    <td class="edit">
      <i class="ph-duotone ph-pencil-simple"
      onclick="openDeviceModal(${funcionario.id_funcionario}, '${funcionario.nome}', '${funcionario.email}')"></i>
      <i class="ph-duotone ph-x-circle" onclick="deleteFuncionario(${funcionario.id_funcionario})"></i>
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
  // const data = {
  //   nome: nome,
  //   email: email,
  // };
  // fetch(`/usuarios/atualizarFuncionario/${id}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       const funcionarioRow = document.querySelector(`tr[data-id="${id}"]`);
  //       funcionarioRow.querySelector('.funcionario-nome').textContent = data.nome;
  //       funcionarioRow.querySelector('.funcionario-email').textContent = data.email;
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Ocorreu um erro:', error);
  //   });
}

const modalStyle = {
  opened: 'opacity: 1; z-index: 10; width: 100vw, height: 100vh',
  closed: 'opacity: 0; z-index: -10',
};

function closeDeviceModal() {
  modal.style = modalStyle.closed;
  // Remove o event listener para a tecla Esc
  document.removeEventListener('keyup', onKeyUp);

  // Remove o event listener para o clique fora do modal
  document.removeEventListener('click', onClickInsideModal);
}

function openDeviceModal(id, nome, email) {
  inputNome = document.getElementById('in_novo_nome');
  inputEmail = document.getElementById('in_novo_email');
  modal = document.querySelector('.modal-content');

  nomeTitle.innerHTML = nome
  emailTitle.innerHTML = email


  modal.style = modalStyle.opened;

  // Adiciona o event listener para a tecla Esc
  document.addEventListener('keyup', onKeyUp);

  // Adiciona o event listener para o clique fora do modal
  if (modal.style.opacity == 1) {
    setTimeout(() => {
      document.addEventListener('click', onClickInsideModal);
    }, 500);
  }
}

function onKeyUp(event) {
  if (event.key === 'Escape') {
    closeDeviceModal();
  }
}

function onClickInsideModal(event) {
  canCloseModal = !inputNome.contains(event.target) && !inputEmail.contains(event.target);

  if (canCloseModal) {
    closeDeviceModal();
  }
}
