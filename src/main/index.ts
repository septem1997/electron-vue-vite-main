import path from 'path'
import {app, BrowserWindow, ipcMain} from 'electron'
import { register } from './communication'
import { execFile } from "child_process";
let win: BrowserWindow | null = null
function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    },
  })

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, '../render/index.html'))
  } else {
    win.maximize()
    win.webContents.openDevTools()
    win.loadURL(`http://localhost:${process.env.PORT}`)
  }

  ipcMain.on('capture',()=>{
    console.log('capture')
    const screen_window = execFile(path.join(__dirname, '../dll/PrintScr.exe'))
    console.log(screen_window)
    screen_window.on('exit', function (code) {
      // 执行成功返回 1，返回 0 没有截图
      if (code) win?.webContents.paste()
    })
  })
  // something init setup
  register(win)
}

app.whenReady().then(bootstrap)

app.on('window-all-closed', () => {
  win = null
  app.quit()
})
