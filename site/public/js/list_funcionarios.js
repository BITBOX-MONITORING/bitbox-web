const fkEmpresa = sessionStorage.getItem('FK_EMPRESA');

const modalStyle = {
  opened: 'opacity: 1; z-index: 10; width: 100vw, height: 100vh',
  closed: 'opacity: 0; z-index: -10',
};

let funcionarios;
let empresa;
let funcNome;
let funcEmail;

let inputNome;
let inputEmail;
let btnEditar;

let modal;

let funcionarioRow;

(async function () {
  const response = await fetch(`/usuarios/selectFuncionarios/${fkEmpresa}`);
  const responseEmpresa = await fetch(`/empresa/selectEmpresa/${fkEmpresa}`);
  funcionarios = await response.json();
  empresa = await responseEmpresa.json();
  console.log(funcionarios);
  console.log(empresa);

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

function editFuncionario(id, nome, email) {
  const data = {
    nome: nome,
    email: email,
  };

  console.log(data);
  console.log('ESTAMOS AQUI');

  if (nome && email) {
    closeDeviceModal();

    fetch(`/usuarios/atualizarFuncionario/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          funcionarioRow.querySelector('.funcionario-nome').textContent = data.nome;
          funcionarioRow.querySelector('.funcionario-email').textContent = data.email;
        }
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  }
}

function showNewName() {
  const nome = inputNome.value;

  nomeTitle.innerHTML = nome ? nome : funcNome;
}

function showNewEmail() {
  const email = inputEmail.value;

  emailTitle.innerHTML = email ? email : funcEmail;
}

function closeDeviceModal() {
  modal.style = modalStyle.closed;
  // Remove o event listener para a tecla Esc
  document.removeEventListener('keyup', onKeyUp);

  // Remove o event listener para o clique fora do modal
  document.removeEventListener('click', onClickInsideModal);
}

function openDeviceModal(id) {
  btnEditar = document.getElementById('btn_editar');
  inputNome = document.getElementById('in_novo_nome');
  inputEmail = document.getElementById('in_novo_email');
  funcionarioRow = document.querySelector(`tr[data-id="${id}"]`);

  modal = document.querySelector('.modal-content');

  funcNome = funcionarioRow.querySelector('.funcionario-nome').textContent;
  funcEmail = funcionarioRow.querySelector('.funcionario-email').textContent;

  nomeTitle.innerHTML = funcNome;
  emailTitle.innerHTML = funcEmail;

  modal.style = modalStyle.opened;

  btnEditar.addEventListener('click', () => {
    editFuncionario(id, inputNome.value, inputEmail.value);
  });

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
  canCloseModal =
    !inputNome.contains(event.target) &&
    !inputEmail.contains(event.target) &&
    !btnEditar.contains(event.target);

  if (canCloseModal) {
    closeDeviceModal();
  }
}

// EMPRESA

function deleteEmpresa() {
  const confirm = window.confirm('❓ Deseja realmente excluir esse Empresa?');

  if (confirm) {
    fetch(`/empresa/excluirEmpresa/${fkEmpresa}`, {
      method: 'DELETE',
    }).then(async (res) => {
      console.log(await res.json());
    });

    alert('Empresa deletado com sucesso!');
    window.location = "sign-page.html";
  }
}

function editEmpresa(nome, cnpj) {
  const data = {
    nome: nome,
    cnpj: cnpj,
  };

  console.log(data);
  console.log('ESTAMOS AQUI');

  if (nome && cnpj) {
    closeDeviceModal();

    fetch(`/empresa/atualizarEmpresa/${fkEmpresa}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
            qnt_funcionarios.innerHTML = empresa.funcionarios;
            qnt_maquinas.innerHTML = empresa.maquinas;
        }
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  }
}
