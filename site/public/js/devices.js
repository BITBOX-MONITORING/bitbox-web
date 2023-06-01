let employee = [];
let tabs = [];
let modal;

const fkEmpresa = sessionStorage.getItem('FK_EMPRESA');

const modalStyle = {
  opened: 'opacity: 1; width: 1000px; height: 600px; z-index: 10',
  closed: 'opacity: 0; width: 0; height: 0; z-index: -10',
};

const statusInfo = {
  ok: {
    color: '#3ad13a',
    text: 'ok',
  },
  alerta: {
    color: '#f5e65b',
    text: 'alerta',
  },
  critico: {
    color: '#e72929',
    text: 'crítico',
  },
};

async function getDeviceInfo() {
  const response = await fetch(`/maquinas/selectMaquinas/${fkEmpresa}`);
  employee = await response.json();
  console.log(employee);

  if (employee) {
    grid_devices.innerHTML = '';

    for (const [index, deviceInfo] of employee.entries()) {
      grid_devices.innerHTML += buildCardDevice(deviceInfo, index);
    }
  }
}

async function getTabs() {
  const response = await fetch(`/maquinas/selectTabs`);
  tabs = await response.json();
  console.log(tabs);
}

getDeviceInfo();
getTabs();

setInterval(() => {
  getDeviceInfo();
}, 5000);

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

function defineStatus(cpu, ram) {
  let status = '';

  if (cpu > 80 && ram > 4) {
    status = 'critico';
  } else if (cpu > 50 && ram > 4) {
    status = 'alerta';
  } else {
    status = 'ok';
  }

  return status;
}

function buildModal(deviceInfo) {
  const device = JSON.parse(deviceInfo.device);
  const data = JSON.parse(deviceInfo.data);
  const lastData = data[data.length - 1];
  let critical;

  // Dados de cada máquina
  const tabs_data = tabs.filter((tab) => tab.codigo_patrimonio === device[0].codigo_patrimonio);

  const cpu_data = data.slice(-6).map((d) => d.cpu_uso);
  const ram_data = data.slice(-6).map((d) => d.ram_uso);
  const disco_data = data.slice(-6).map((d) => d.disco_uso);
  const moment_data = data.slice(-6).map((d) => {
    const dataRegistro = new Date(d.data_registro);
    return dataRegistro.toLocaleTimeString();
  });

  const deviceData = {
    cpu: cpu_data,
    ram: ram_data,
    disco: disco_data,
    moment: moment_data,
    tabs: tabs_data,
  };

  localStorage.setItem('DEVICE_DATA', JSON.stringify(deviceData));

  lastData.status = defineStatus(lastData.cpu_uso, lastData.ram_uso);
  const status = statusInfo[lastData.status];

  device.img =
    device[0].sistema_operacional === 'Linux'
      ? 'assets/device-linux.png'
      : 'assets/device-windows.png';

  if (lastData.cpu_uso > 80) {
    critical = 'animation: critical 1s ease infinite;';
  }

  const modal = ` 
    <div class="card" style="${critical}">
    <button class="btn-delete" onclick="deleteDevice(${device[0].id_maquina})">
      <i class="ph-duotone ph-x-circle"></i>
      Deletar
    </button>
      <div class="img-device">
          <img src="${device.img}" alt="">
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
          <h1>${lastData.cpu_uso.toFixed(2)}%</h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph-rocket-launch"></i>
              <span>RAM</span>
          </div>
          <h1>${Number(lastData.ram_uso).toFixed(1)} <em>GB</em></h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph ph-disc"></i>
              <span>DISCO</span>
          </div>
          <h1>${parseInt(lastData.disco_uso)}%</h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph-duotone ph-warning"></i>
              <span>STATUS</span>
          </div>
          <div class="status-info">
              <div style="background-color: ${status.color}" class="status"></div>
              <h1 style="color: ${status.color}">${status.text}</h1>
          </div>
      </div>
    </div>`;

  return modal;
}

function buildCardDevice(deviceInfo, index) {
  const device = JSON.parse(deviceInfo.device);
  const data = JSON.parse(deviceInfo.data);
  const lastData = data[data.length - 1];
  let critical;

  lastData.status = defineStatus(lastData.cpu_uso, lastData.ram_uso);
  const status = statusInfo[lastData.status];

  if (lastData.cpu_uso > 80) {
    critical = 'animation: critical 1s ease infinite;';
  }

  device.img =
    device[0].sistema_operacional === 'Linux'
      ? 'assets/device-linux.png'
      : 'assets/device-windows.png';

  const cardDevice = `
    <div class="card" style="${critical}" onclick="openDeviceModal(${index})">
      <div class="img-device">
      <img src="${device.img}" alt="">
      </div>

      <div class="info">
      <span>${device[0].codigo_patrimonio}</span>
      <h1>${device[0].sistema_operacional}</h1>
      <h3>${deviceInfo.nome}</h3>
      </div>

      <div class="status" style="background-color:${status.color}"></div>
    </div>`;

  return cardDevice;
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

function closeDeviceModal() {
  modal.style = modalStyle.closed;

  // Remove o event listener para a tecla Esc
  document.removeEventListener('keyup', onKeyUp);

  // Remove o event listener para o clique fora do modal
  document.removeEventListener('click', onClickOutsideModal);

  clearInterval(intervalID);
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

let intervalID;

function openDeviceModal(index) {
  const statusBar = document.querySelector('.status-bar');

  let device = employee[index];
  console.log(device);
  modal.style = modalStyle.opened;
  statusBar.innerHTML = buildModal(device);

  if (intervalID) {
    clearInterval(intervalID);
  }

  intervalID = setInterval(() => {
    device = employee[index];
    console.log(device);
    statusBar.innerHTML = buildModal(device);
  }, 5000);

  // Adiciona o event listener para a tecla Esc
  document.addEventListener('keyup', onKeyUp);

  // Adiciona o event listener para o clique fora do modal
  if (modal.style.opacity == 1) {
    setTimeout(() => {
      document.addEventListener('click', onClickOutsideModal);
    }, 500);
  }
}
