// 主进程
const { app, BrowserWindow, Notification, ipcMain } = require("electron");

// 放在这里防止被垃圾回收
let win;
app.on("ready", () => {
  win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.loadFile("./index.html");
  handleIpc();
});

function handleIpc() {
  ipcMain.handle("work-notification", async (event, arg) => {
    return new Promise((resolve, reject) => {
      let notification = new Notification({
        title: "任务结束了",
        body: "是否开始休息",
        actions: [{ text: "开始休息", type: "button" }],
        closeButtonText: "继续工作",
      });
      notification.show();
      notification.on("action", (event, action) => {
        resolve("reset");
      });
      notification.on("close", (event, action) => {
        resolve("work");
      });
    });
  });
}
