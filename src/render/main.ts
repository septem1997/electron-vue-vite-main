import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import naive from "naive-ui";
import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";
import VueCropper from "vue-cropper";
import "vue-cropper/dist/index.css";
import i18n from "./i18n";
const router = createRouter({
  routes,
  history: createWebHistory(),
});

const app = createApp(App);
app.use(naive).use(router).use(VueCropper).use(i18n).mount("#app");

console.log("fs", window.fs);
console.log("ipcRenderer", window.ipcRenderer);
