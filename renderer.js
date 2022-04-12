const { ipcRenderer } = require("electron");
const Timer = require("timer.js");
// 渲染进程

function startWork() {
  let workTimer = new Timer({
    ontick: function (ms) {
      console.log(ms + " milliseconds left");
      updateTime(ms);
    },

    onend: function () {
      console.log("timer ended normally");
      notification();
    },
  });
  workTimer.start(10);
}
function updateTime(ms) {
  let timerContainer = document.getElementById("timer-container");
  let s = Math.trunc(ms / 1000);
  let mm = Math.trunc(s / 60);
  let ss = Math.trunc(s % 60);
  timerContainer.innerText = `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}`
}
async function notification() {
  let res = await ipcRenderer.invoke("work-notification");
  console.log("res: ", res);
  if (res === "reset") {
    setTimeout(() => {
      alert("休息");
    }, 5 * 1e3);
  } else {
    startWork();
  }
}
startWork();
