import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exhibition from '../views/Exhibition.vue'
import Artist from '../views/Artist.vue' 
import Login from '../views/Login.vue' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/exhibition',
    name: 'exhibition',
    component: Exhibition
  }, 
  {
    path: '/artist',
    name: 'artist',
    component: Artist
  }, 
  {
    path: '/login',
    name: 'login',
    component: Login
  }, 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
