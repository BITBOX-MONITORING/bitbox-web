document.addEventListener("DOMContentLoaded", () => {
  const devices = [
    { id: "BOX-001-215489", type: "NOTEBOOK", name: "MAC ULTRA PRO", status: "alert" },
    { id: "BOX-002-219874", type: "DESKTOP", name: "CCE ULTRAPRO", status: "ok" },
    { id: "BOX-003-215544", type: "NOTEBOOK", name: "LENOVO THINKPAD", status: "danger" },
    { id: "BOX-003-215544", type: "NOTEBOOK", name: "LENOVO THINKPAD", status: "danger" },
    { id: "BOX-003-215544", type: "NOTEBOOK", name: "LENOVO THINKPAD", status: "danger" },
    { id: "BOX-004-215456", type: "DESKTOP", name: "ACER HILUX", status: "ok" },
    { id: "BOX-005-215322", type: "DESKTOP", name: "ACER HILUX", status: "alert" },
    { id: "BOX-006-215123", type: "NOTEBOOK", name: "LENOVO THINKPAD", status: "danger" },
    { id: "BOX-006-215123", type: "NOTEBOOK", name: "LENOVO THINKPAD", status: "danger" },
  ];

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

  for (const device of devices) {
    const imgDevice = device.type === "NOTEBOOK" ? "assets/notebook.png" : "assets/desktop.png";
    const colorStatus = statusColors[device.status];

    grid_devices.innerHTML += `
    <div class="card">
        <div class="img-device">
        <img src="${imgDevice}" alt="">
        </div>

        <div class="info">
        <span>${device.id}</span>
        <h1>${device.name}</h1>
        </div>

        <div class="status" style="background-color:${colorStatus}"></div>
    </div>`;
  }
});
