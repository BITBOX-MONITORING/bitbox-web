const devices = [
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Elma Maria", status: "alerta" },
  { id: "BD0987", img: "", type: "WINDOWS", name: "WINDOWS 10", user: "Josimar Mar", status: "ok" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Epaminondas Lúcio", status: "crítico" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Catarina Marica", status: "crítico" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Thiago Gomes", status: "crítico" },
  { id: "BD0987", img: "", type: "WINDOWS", name: "WINDOWS 10", user: "Fernananda Caramico", status: "ok" },
  { id: "BD0987", img: "", type: "WINDOWS", name: "WINDOWS 10", user: "Paulo Mimoso", status: "alerta" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Giuseppe Casseca", status: "crítico" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Simas Turbo", status: "crítico" },
];

const statusColors = {
  ok: "#3ad13a",
  alerta: "#f5e65b",
  crítico: "#d13a47",
};

function buildModal(device) {

  const colorStatus = statusColors[device.status];

  const modal = ` 
    <div class="card">
      <div class="img-device">
          <img src="${device.img}" alt="">
      </div>

      <div class="info">
          <span>${device.id}</span>
          <h1>${device.name}</h1>
          <h3>${device.user}</h3>
      </div>
      </div>

      <div class="device-kpi">
      <div class="kpi">
          <div class="title">
              <i class="ph ph-cpu"></i>
              <span> CPU </span>
          </div>
          <h1>15%</h1>
      </div>

      <div class="wall"></div>

      <div class="kpi">
          <div class="title">
              <i class="ph-rocket-launch"></i>
              <span>RAM</span>
          </div>
          <h1>4.8 <em>GB</em></h1>
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
              <h1 style="color: ${colorStatus}">${device.status}</h1>
          </div>
      </div>
    </div>`

  return modal
}

function buildCardDevice(device, index) {
  device.img = device.type === "LINUX" ? "assets/device-linux.png" : "assets/device-windows.png";

  const colorStatus = statusColors[device.status];

  const cardDevice = `
    <div class="card" onclick="openDeviceModal(${index})">
      <div class="img-device">
      <img src="${device.img}" alt="">
      </div>

      <div class="info">
      <span>${device.id}</span>
      <h1>${device.name}</h1>
      <h3>${device.user}</h3>
      </div>

      <div class="status" style="background-color:${colorStatus}"></div>
    </div>`;

  return cardDevice
}

let modal
const modalStyle = {
  opened: "opacity: 1; width: 1000px; height: 600px; z-index: 10",
  closed: "opacity: 0; width: 0; height: 0; z-index: -10",
}

document.addEventListener("DOMContentLoaded", () => {
  modal = document.querySelector(".device-info")

  devices.sort(function (a, b) {
    if (a.status === "crítico" && b.status !== "crítico") {
      return -1;
    }
    if (b.status === "crítico" && a.status !== "crítico") {
      return 1;
    }
    if (a.status === "alerta" && b.status !== "alerta" && b.status !== "crítico") {
      return -1;
    }
    if (b.status === "alerta" && a.status !== "alerta" && a.status !== "crítico") {
      return 1;
    }
    return 0;
  });

  for (const [index, device] of devices.entries()) {
    grid_devices.innerHTML += buildCardDevice(device, index)
  }
});

function closeDeviceModal() {
  modal.style = modalStyle.closed;

  // Remove o event listener para a tecla Esc
  document.removeEventListener("keyup", onKeyUp);

  // Remove o event listener para o clique fora do modal
  document.removeEventListener("click", onClickOutsideModal);
}

function onKeyUp(event) {
  if (event.key === "Escape") {
    closeDeviceModal();
  }
}

function onClickOutsideModal(event) {
  if (!modal.contains(event.target)) {
    closeDeviceModal()
  }
}

function openDeviceModal(index) {
  const statusBar = document.querySelector(".status-bar")
  const device = devices[index];

  let device_data = {
    cpu: [],
    ram: [],
    disco: [],
    abas: []
  }
  
  for (let i = 0; i < 6; i++){
    device_data.cpu.push(parseInt(Math.random() * 100))
    device_data.ram.push(parseInt(Math.random() * 8))
    device_data.disco.push(parseInt(Math.random() * 500))
    device_data.abas.push(parseInt(Math.random() * 20))
  }

  localStorage.setItem('data', JSON.stringify(device_data))

  modal.style = modalStyle.opened;
  statusBar.innerHTML = buildModal(device)

  // Adiciona o event listener para a tecla Esc
  document.addEventListener("keyup", onKeyUp);

  // Adiciona o event listener para o clique fora do modal
  if (modal.style.opacity == 1) {
    setTimeout(() => {
      document.addEventListener("click", onClickOutsideModal);
    }, 500)
  }
}
