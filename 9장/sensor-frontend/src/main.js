import {
    createApp
} from 'vue'
import store from './store'
import App from './App.vue'


// import socketPlugin from './plugins/socketPlug.js'
// import config from './config'
// createApp(App)
// .use(store)
// .use(socketPlugin, {
//     host: config.host
// }).mount('#app')  

createApp(App)
.use(store)
.mount('#app')