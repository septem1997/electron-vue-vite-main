import fs from 'fs'
import { contextBridge, ipcRenderer,desktopCapturer } from 'electron'
import { domReady, injectWsCode } from './utils'
import IpcRendererEvent = Electron.IpcRendererEvent;
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
  send:(channel:string, ...args: any[])=>{
    // todo 验证安全性
    ipcRenderer.send(channel,args)
  },
  on:(channel:string, listener: (event: IpcRendererEvent, ...args: any[]) => void)=>{
    // todo 验证安全性
    ipcRenderer.on(channel,listener)
  },
  invoke:ipcRenderer.invoke
})
contextBridge.exposeInMainWorld('desktopCapturer',desktopCapturer)
