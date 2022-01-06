import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


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
  },
  {
    path: '/incomedetail',
    component: () => import('views/incomeDetail/IncomeDetail'),
    name: 'incomedetail'
  },
  {
    path: '/updatefund',
    component: () => import('views/editFund/updateFund/UpdateFund'),
    name: 'updatefund'
  },
  {
    path: '/addfund',
    component: () => import('views/editFund/addFund/AddFund'),
    name: 'addfund'
  },
  {
    path: '/sellfund',
    component: () => import('views/editFund/sellFund/SellFund'),
    name: 'sellfund'
  },
  {
    path: '/operationfund',
    component: () => import('views/editFund/operationFund/OperationFund'),
    name: 'operationfund'
  },
  {
    path: '/love',
    component: () => import('views/love/Love'),
    name: 'love'
  },
  {
    path: '/incomecalendar',
    component: () => import('views/setting/incomeCalendar/IncomeCalendar'),
    name: 'incomecalendar'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router