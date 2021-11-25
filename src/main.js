import Vue from 'vue'
import App from './App.vue'
import "./assets/css/font_1108228_bldmi2uv32w/iconfont.css"
import { Toast, NavBar, Icon, Form, Field, Button, Cell, CellGroup,Switch  } from "vant"
Vue.use(NavBar).use(Toast)
.use(Icon).use(Form).use(Field).use(Button).use(CellGroup).use(Cell).use(Switch)

import router from './router/index'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
