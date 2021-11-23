import Vue from 'vue'
import App from './App.vue'
import "./assets/css/font_1108228_bldmi2uv32w/iconfont.css"
import { Toast, NavBar, Icon } from "vant"
Vue.use(NavBar).use(Toast).use(Icon)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
