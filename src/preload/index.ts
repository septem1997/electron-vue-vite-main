import fs from 'fs'
import { contextBridge, ipcRenderer,desktopCapturer } from 'electron'
import { domReady, injectWsCode } from './utils'
const isDev = process.env.NODE_ENV === 'development'

domReady().then(() => {
  isDev && injectWsCode({
    host: '127.0.0.1',
    port: process.env.PORT_WS as string, // process.env.npm_package_env_PORT_WS
  })
})
// --------- Expose some API to Renderer process. ---------
contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('ipcRenderer', {
  send:(channel:string, data:any)=>{
    // todo 验证安全性
    ipcRenderer.send(channel,data)
  },
  on:(channel:string, data:any)=>{
    // todo 验证安全性
    ipcRenderer.on(channel,data)
  }
})
contextBridge.exposeInMainWorld('desktopCapturer',desktopCapturer)
