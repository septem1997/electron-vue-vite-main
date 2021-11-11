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

    }
    ipcMain.on(START_CAPTURE, () => {
        console.log('handle')
        captureWindow = new BrowserWindow()
        captureWindow?.maximize()
        captureWindow?.webContents.openDevTools()
        captureWindow?.loadURL(`http://localhost:${process.env.PORT}/capture`)
    })
}
