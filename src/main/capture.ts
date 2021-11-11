import {app, BrowserWindow, ipcMain} from 'electron'
import {
    START_CAPTURE
} from '@/common/constant/event'
import path from "path";

let captureWindow:null|BrowserWindow = null;
export function registerCapture() {
    if (app.isPackaged) {
        // captureWindow.loadFile(path.join(__dirname, '../render/index.html'))
    } else {
        captureWindow = new BrowserWindow({
            show:false
        })
        captureWindow?.loadURL(`http://localhost:${process.env.PORT}/capture`)
        captureWindow?.webContents.openDevTools()
    }
    ipcMain.on(START_CAPTURE, () => {
        captureWindow?.setFullScreen(true)
        captureWindow?.show()
    })
}
