import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import naive from 'naive-ui'

createApp(App)
.use(naive)
.mount('#app')
.$nextTick(window.removeLoading)

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)
