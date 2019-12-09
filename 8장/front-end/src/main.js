import Vue from 'vue'
import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2';
import store from './store'
import socketPlugin from './plugins/socketPlug.js' 
import config from './config'  
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(socketPlugin, {host : config.host})
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
