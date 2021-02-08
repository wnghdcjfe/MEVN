import {
    createApp
} from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App.vue'
import store from './store'
import router from './router'

createApp(App) 
.use(router)
.use(store).mount('#app')