import Vue from 'vue'
import Router from 'vue-router'
import SensorChart from './views/SensorChart.vue'     
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'SensorChart',
      component: SensorChart
    },
    {
      path: '/map',
      name: 'map', 
      component: () => import('./views/Map.vue')
    },{
      path: '/number',
      name: 'number', 
      component: () => import('./views/Number.vue')
    },{
      path: '/imgSlider',
      name: 'imgSlider', 
      component: () => import('./views/Slider.vue')
    },{ 
      path: '*',
      name: '404', 
      component: () => import('./views/Lost.vue')
    }
  ]
})
