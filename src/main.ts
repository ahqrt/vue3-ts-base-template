import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import '@/assets/css/index.css'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(store)
  .mount('#app')
