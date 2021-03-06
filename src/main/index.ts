import path from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import { register } from "./communication";
import { registerCapture } from "@/main/capture";

let win: BrowserWindow | null = null;
function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../render/index.html"));
  } else {
    // win.maximize()
    win.webContents.openDevTools();
    win.loadURL(`http://localhost:${process.env.PORT}/test`);
  }
  // something init setup
  register(win);
  registerCapture(win);
}

app.whenReady().then(bootstrap);

app.on("window-all-closed", () => {
  win = null;
  app.quit();
});
