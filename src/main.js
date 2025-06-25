import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 注册所有 Element Plus 图标组件
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component)
})

app.mount('#app')
