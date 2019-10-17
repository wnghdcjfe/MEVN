import Vue from 'vue'
import App from './App.vue'

import store from './store'
import socketPlugin from './plugins/socketPlug.js' 
import config from './config'  
Vue.config.productionTip = false

Vue.use(socketPlugin, {host : config.host})
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
