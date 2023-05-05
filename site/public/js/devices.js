const devices = [
  { id: "BD0987", type: "LINUX", name: "UBUNTU 22.2", user: "Elma Maria", status: "alert" },
  { id: "BD0987", type: "WINDOWS", name: "WINDOWS 10", user: "Josimar Mar", status: "ok" },
  { id: "BD0987", type: "LINUX", name: "UBUNTU 22.2", user: "Epaminondas Lúcio", status: "danger" },
  { id: "BD0987", type: "LINUX", name: "UBUNTU 22.2", user: "Catarina Marica", status: "danger" },
  { id: "BD0987", type: "LINUX", name: "UBUNTU 22.2", user: "Thiago Gomes", status: "danger" },
  { id: "BD0987", type: "WINDOWS", name: "WINDOWS 10", user: "Fernananda Caramico", status: "ok" },
  { id: "BD0987", type: "WINDOWS", name: "WINDOWS 10", user: "Paulo Mimoso", status: "alert" },
  { id: "BD0987", type: "LINUX", name: "UBUNTU 22.2", user: "Giuseppe Casseca", status: "danger" },
  { id: "BD0987", type: "LINUX", name: "UBUNTU 22.2", user: "Simas Turbo", status: "danger" },

];

document.addEventListener("DOMContentLoaded", () => {
  
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

  const statusColors = {
    ok: "#3ad13a",
    alert: "#f5e65b",
    danger: "#d13a47",
  };

  for (const [index ,device] of devices.entries()) {
    const imgDevice = device.type === "LINUX" ? "assets/device-linux.png" : "assets/device-windows.png";
    const colorStatus = statusColors[device.status];
  
    grid_devices.innerHTML += `
    <div class="card" onclick="openDeviceModal(${index})">
        <div class="img-device">
        <img src="${imgDevice}" alt="">
        </div>
  
        <div class="info">
        <span>${device.id}</span>
        <h1>${device.name}</h1>
        <h3>${device.user}</h3>
        </div>
  
        <div class="status" style="background-color:${colorStatus}"></div>
    </div>`;
  }
  
});

const style = {
  opened: "display: grid; opacity: 1; width: 1000px; height: 600px;",
  closed: "display: none; opacity: 0; width: 0; height: 0;",
}

function openDeviceModal(index) {
  const device = devices[index] 
  
  const modal = document.querySelector(".device-info")
  modal.style = style.opened
}

function closeDeviceModal(){
  const modal = document.querySelector(".device-info")

  modal.style = style.closed
}
