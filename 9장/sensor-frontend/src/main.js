import {
    createApp
} from 'vue'
import store from './store'
import App from './App.vue'
import socketPlugin from './plugins/socketPlug.js' 
import {host} from './config'
createApp(App)
.use(store)
.use(socketPlugin, {
    host
})
.mount('#app')