import Vue from 'vue'
import VueRouter from 'vue-router'
import Birthday from '../views/Birthday.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Birthday',
    component: Birthday
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  routes
})

export default router
