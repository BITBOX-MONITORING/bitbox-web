const devices = [
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Elma Maria", status: "alert" },
  { id: "BD0987", img: "", type: "WINDOWS", name: "WINDOWS 10", user: "Josimar Mar", status: "ok" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Epaminondas Lúcio", status: "danger" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Catarina Marica", status: "danger" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Thiago Gomes", status: "danger" },
  { id: "BD0987", img: "", type: "WINDOWS", name: "WINDOWS 10", user: "Fernananda Caramico", status: "ok" },
  { id: "BD0987", img: "", type: "WINDOWS", name: "WINDOWS 10", user: "Paulo Mimoso", status: "alert" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Giuseppe Casseca", status: "danger" },
  { id: "BD0987", img: "", type: "LINUX", name: "UBUNTU 22.2", user: "Simas Turbo", status: "danger" },
];

function buildModal(device) {

  const modal = ` <div class="card">
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
          <div class="status"></div>
          <h1>OK</h1>
      </div>
  </div>
</div>`

  return modal
}

function buildCardDevice(device, index) {
  device.img = device.type === "LINUX" ? "assets/device-linux.png" : "assets/device-windows.png";

  const statusColors = {
    ok: "#3ad13a",
    alert: "#f5e65b",
    danger: "#d13a47",
  };

  const colorStagitus = statusColors[device.status];

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
    if (a.status === "danger" && b.status !== "danger") {
      return -1;
    }
    if (b.status === "danger" && a.status !== "danger") {
      return 1;
    }
    if (a.status === "alert" && b.status !== "alert" && b.status !== "danger") {
      return -1;
    }
    if (b.status === "alert" && a.status !== "alert" && a.status !== "danger") {
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
