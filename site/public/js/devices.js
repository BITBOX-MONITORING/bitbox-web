let employee = [];

(async function () {
  const response = await fetch('/maquinas/selectMaquinas');
  employee = await response.json();
  console.log(employee);

  if (employee) {
    for (const [index, deviceInfo] of employee.entries()) {
      grid_devices.innerHTML += buildCardDevice(deviceInfo, index);
    }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  modal = document.querySelector('.device-info');

  // devices.sort(function (a, b) {
  //   if (a.status === 'crítico' && b.status !== 'crítico') {
  //     return -1;
  //   }
  //   if (b.status === 'crítico' && a.status !== 'crítico') {
  //     return 1;
  //   }
  //   if (a.status === 'alerta' && b.status !== 'alerta' && b.status !== 'crítico') {
  //     return -1;
  //   }
  //   if (b.status === 'alerta' && a.status !== 'alerta' && a.status !== 'crítico') {
  //     return 1;
  //   }
  //   return 0;
  // });
});

const statusColors = {
  ok: '#3ad13a',
  alerta: '#f5e65b',
  crítico: '#d13a47',
};

function buildModal(deviceInfo) {
  const colorStatus = 'red';

  const device = JSON.parse(deviceInfo.device);
  const data = JSON.parse(deviceInfo.data);

  const modal = ` 
    <div class="card">
    <button onclick="deleteDevice(${device[0].id_maquina})">Deletar</button>
      <div class="img-device">
          <img src="${deviceInfo.img}" alt="">
      </div>

      <div class="info">
          <span>${device[0].codigo_patrimonio}</span>
          <h1>${device[0].sistema_operacional}</h1>
          <h3>${deviceInfo.nome}</h3>
      </div>
      </div>

      <div class="device-kpi">
      <div class="kpi">
          <div class="title">
              <i class="ph ph-cpu"></i>
              <span> CPU </span>
          </div>
          <h1>${data[0].cpu_uso.toFixed(2)}%</h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph-rocket-launch"></i>
              <span>RAM</span>
          </div>
          <h1>${Number(data[0].ram_uso).toFixed(1)} <em>GB</em></h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph ph-disc"></i>
              <span>DISCO</span>
          </div>
          <h1>49%</h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph-duotone ph-warning"></i>
              <span>STATUS</span>
          </div>
          <div class="status-info">
              <div style="background-color: ${colorStatus}" class="status"></div>
              <h1 style="color: ${colorStatus}"></h1>
          </div>
      </div>
    </div>`;

  return modal;
}

function deleteDevice(id) {
  const confirm = window.confirm('❓ Deseja realmente excluir essa máquina?');

  if (confirm) {
    fetch(`/maquinas/excluirMaquina/${id}`, {
      method: 'DELETE',
    }).then(async (res) => {
      if (res.ok) {
        alert('Máquina deletada com sucesso!');
        location.reload();
      } else {
        console.log('Erro ao excluir a máquina:', res.status);
      }
    });
  }
}

function buildCardDevice(deviceInfo, index) {
  const device = JSON.parse(deviceInfo.device);

  device.img =
    device.sistema_operacional === 'LINUX'
      ? 'assets/device-linux.png'
      : 'assets/device-windows.png';

  const colorStatus = statusColors[device.status];

  const cardDevice = `
    <div class="card" onclick="openDeviceModal(${index})">
      <div class="img-device">
      <img src="${device.img}" alt="">
      </div>

      <div class="info">
      <span>${device[0].codigo_patrimonio}</span>
      <h1>${device[0].sistema_operacional}</h1>
      <h3>${deviceInfo.nome}</h3>
      </div>

      <div class="status" style="background-color:${colorStatus}"></div>
    </div>`;

  return cardDevice;
}

let modal;
const modalStyle = {
  opened: 'opacity: 1; width: 1000px; height: 600px; z-index: 10',
  closed: 'opacity: 0; width: 0; height: 0; z-index: -10',
};

function closeDeviceModal() {
  modal.style = modalStyle.closed;

  // Remove o event listener para a tecla Esc
  document.removeEventListener('keyup', onKeyUp);

  // Remove o event listener para o clique fora do modal
  document.removeEventListener('click', onClickOutsideModal);
}

function onKeyUp(event) {
  if (event.key === 'Escape') {
    closeDeviceModal();
  }
}

function onClickOutsideModal(event) {
  if (!modal.contains(event.target)) {
    closeDeviceModal();
  }
}

function openDeviceModal(index) {
  const statusBar = document.querySelector('.status-bar');
  const device = employee[index];

  console.log(device);

  modal.style = modalStyle.opened;
  statusBar.innerHTML = buildModal(device);

  // Adiciona o event listener para a tecla Esc
  document.addEventListener('keyup', onKeyUp);

  // Adiciona o event listener para o clique fora do modal
  if (modal.style.opacity == 1) {
    setTimeout(() => {
      document.addEventListener('click', onClickOutsideModal);
    }, 500);
  }
}
