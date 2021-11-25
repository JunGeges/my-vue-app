import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    component: () => import('views/home/Home'),
    name: 'home'
  },
  {
    path: '/add',
    component: () => import('views/add/Add'),
    name: 'add'
  },
  {
    path: '/setting',
    component: () => import('views/setting/Setting'),
    name: 'setting'
  },
  {
    path: '/login',
    component: () => import('views/login/Login'),
    name: 'login'
  },
  {
    path: '/fundgroup',
    component: () => import('views/fundGroup/FundGroup'),
    name: 'fundgroup'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router