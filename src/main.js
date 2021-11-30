import Vue from 'vue'
import App from './App.vue'
import "./assets/css/font_1108228_bldmi2uv32w/iconfont.css"
import { Toast, Dialog, NavBar, ActionSheet, Icon, Form, Field, Button, Cell, CellGroup, Switch } from "vant"
Vue.use(NavBar).use(Toast).use(Dialog).use(ActionSheet)
  .use(Icon).use(Form).use(Field).use(Button).use(CellGroup).use(Cell).use(Switch)

import router from './router/index'
import store from './store/index'
import Cloudbase from '@cloudbase/vue-provider'

Vue.use(Cloudbase, {
  env: 'my-vue-app-3gzt852m31ab7bfe'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
