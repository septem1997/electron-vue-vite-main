import { app, BrowserWindow, ipcMain, globalShortcut } from "electron";
import {
  HIDE_CAPTURE_WINDOW,
  SetCaptureImg,
  SHOW_CAPTURE_WINDOW,
  START_CAPTURE,
} from "@/common/constant/event";
import path from "path";

let captureWindow: null | BrowserWindow = null;
export function registerCapture(mainWindow: BrowserWindow) {
  if (app.isPackaged) {
    // captureWindow.loadFile(path.join(__dirname, '../render/index.html'))
  } else {
    captureWindow = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: path.join(__dirname, "../preload/index.js"),
      },
    });
    captureWindow?.loadURL(`http://localhost:${process.env.PORT}/capture`);
    captureWindow?.webContents.openDevTools();
  }
  ipcMain.on(HIDE_CAPTURE_WINDOW, () => {
    captureWindow?.hide();
  });
  globalShortcut.register("Escape", () => {
    if (captureWindow?.isVisible()) {
      captureWindow?.hide();
      mainWindow.show();
    }
  });
  ipcMain.on(START_CAPTURE, (e, base64Data) => {
    console.log("Set Capture Img");
    captureWindow?.webContents.send(SetCaptureImg, base64Data);
  });
  ipcMain.on(SHOW_CAPTURE_WINDOW, () => {
    console.log("SHOW CAPTURE WINDOW");
    captureWindow?.setFullScreen(true);
    captureWindow?.show();
  });
}
