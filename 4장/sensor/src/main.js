import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socketPlugin from './plugins/socketPlug.js'
import config from './config' 
import {s1, s2, s3} from './a.js'
console.log(s1, s2, s3)
Vue.config.productionTip = false

Vue.use(socketPlugin, {host : config.host, port : config.port}) 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
