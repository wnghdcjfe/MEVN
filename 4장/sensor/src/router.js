import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'  
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '*',
      name: '404', 
      component: () => import('./views/Lost.vue')

    }
  ]
})
