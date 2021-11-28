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
  },
  {
    path: '/updatelog',
    component: () => import('views/updateLog/UpdateLog'),
    name: 'updatelog'
  },
  {
    path: '/setcustomcloumn',
    component: () => import('views/setCustomCloumn/SetCustomCloumn'),
    name: 'setcustomcloumn'
  },
  {
    path: '/about',
    component: () => import('views/about/About'),
    name: 'about'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router