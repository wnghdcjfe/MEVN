import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import socketPlugin from './plugins/socketPlug.js'  
import {host} from './config'
import VueSweetalert2 from 'vue-sweetalert2';

createApp(App)
.use(VueSweetalert2)
.use(store)
.use(socketPlugin, {host})
.mount('#app')  