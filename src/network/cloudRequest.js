import Vue from "vue"
import store from 'store'

/**
 * 封装callFunction
 * @param {String} fun 云函数名
 * @param {{}} args 云函数参数 可选
 * @returns Promise 
 */
// Vue.prototype 直接用原型上的方法,不用传vue实例进来
export default async function cloudRequest(fun, args) {
  if (!arguments.length || (args && Object.prototype.toString.call(args) !== '[object Object]')) return Vue.prototype.$toast('参数有误!')
  // console.log('args', args)
  return await Vue.prototype.$cloudbase.callFunction({
    name: fun,
    // args 存在就解构args
    ...(args && {
      data: Object.assign(args, {
        uid: store.state.uid
      })
    })
  })
}