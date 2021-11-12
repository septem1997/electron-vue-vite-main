/**
 * Expose something function to renderer
 */
import { BrowserWindow, ipcMain } from 'electron'
import {
  HIDE_MAIN_WINDOW,
  LOGIN,
  LOGOUT,
  TOGGLE_DEVTOOLS,
} from '@/common/constant/event'

export function register(mainWindow: BrowserWindow) {
  ipcMain.handle(TOGGLE_DEVTOOLS, () => {
    mainWindow.webContents.toggleDevTools()
  })
  ipcMain.handle(HIDE_MAIN_WINDOW,async () => {
    await new Promise((resolve) => {
      mainWindow.on("hide", () => {
        console.log('main hide window')
        resolve(true)
      })
      mainWindow.hide()
    })
    return
  })
  ipcMain.handle(LOGOUT, () => { })
}
