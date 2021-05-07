import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PageSingle from '../views/PageSingle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home/:username',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:username/pagesingle/:id?',
    name: 'PageSingle',
    component: PageSingle
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
