import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/dashboard/Dashboard.vue'
import Panels from '../components/panels/Panels.vue'

Vue.use(VueRouter)

const title = 'Lytko'

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: Dashboard,
    meta: {
      title: 'Главная - ' + title,
    },
  },
  {
    path: '/panels',
    name: 'Panels',
    component: Panels,
    meta: {
      title: 'Panels - ' + title,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})