import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import naive from 'naive-ui'
import routes from './routes'
import {createRouter, createWebHistory} from "vue-router";
const router = createRouter({
    routes,
    history: createWebHistory()
});
createApp(App)
.use(naive)
.use(router)
.mount('#app')
.$nextTick(window.removeLoading)

console.log('fs', window.fs)
console.log('ipcRenderer', window.ipcRenderer)
