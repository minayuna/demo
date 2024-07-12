import './assets/style/main.css'
import 'virtual:svg-icons-register'
import { createApp } from "vue"
import ElementPlus from 'element-plus'
import router from './router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from "./App.vue"
import pinia from './stores/index'
import gloablComponent from './components/index'

const app = createApp(App);
app.use(gloablComponent);
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(pinia)
app.mount("#app");
