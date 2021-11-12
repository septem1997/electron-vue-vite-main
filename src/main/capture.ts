import {app, BrowserWindow, ipcMain} from 'electron'
import {
    CAPTURE_SCREEN, SHOW_CAPTURE_WINDOW,
    START_CAPTURE
} from '@/common/constant/event'
import path from "path";

let captureWindow:null|BrowserWindow = null;
export function registerCapture() {
    if (app.isPackaged) {
        // captureWindow.loadFile(path.join(__dirname, '../render/index.html'))
    } else {
        captureWindow = new BrowserWindow({
            show:false,
            webPreferences: {
                preload: path.join(__dirname, '../preload/index.js'),
            },
        })
        captureWindow?.loadURL(`http://localhost:${process.env.PORT}/capture`)
        captureWindow?.webContents.openDevTools()
    }
    ipcMain.on(START_CAPTURE, () => {
        captureWindow?.webContents.send(CAPTURE_SCREEN)
    })
    ipcMain.on(SHOW_CAPTURE_WINDOW,()=>{
        captureWindow?.setFullScreen(true)
        captureWindow?.show()
    })
}
