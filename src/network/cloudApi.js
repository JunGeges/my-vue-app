import cloudRequest from "./cloudRequest";
import { CHANGE_LOGIN_STATE } from 'store/mutations-type'
/**
 * @desc 获取版本日志
 * @returns 版本记录
 */
export async function getVersionLog() {
  // 检查云开发登录状态
  if (!isLogin.call(this)) return

  return await cloudRequest('getVersionLog')
}

// 登录/注册
export async function singInOrUp(email, password, isLogin) {
  const API = isLogin === 0 ? 'signInWithEmailAndPassword' : 'signUpWithEmailAndPassword'
  this.$cloudbase
    .auth({
      persistence: "local",
    })[API](email, password)
    .then((loginState) => {
      console.log(loginState);
      // 登录 注册成功
      // 登录状态存vuex
      this.$store.commit({
        type: CHANGE_LOGIN_STATE,
        hasLoginState: loginState
      });
    })
    .catch((err) => {
      this.$toast(`${isLogin === 0 ? '账号或密码有误!' : '注册失败!'}`)
      console.log(err);
    });
}

// 退出登录
export async function singOut() {
  this.$cloudbase.auth().signOut().then(() => {
    // 成功退出登录 todo

  }).catch(() => {
    this.$toast('退出失败!')
  })
}

// 是否登录云开发 记录登录状态
function isLogin() {
  const result = this.$cloudbase.auth().hasLoginState()
  if (!result) {
    this.$toast({
      message: '未登录,即将去登录~'
    })
    // 未登录修改vuex状态
    this.$store.commit({
      type: CHANGE_LOGIN_STATE,
      hasLoginState: result
    })
    // 未登录跳转去登录页面
    setTimeout(() => {
      this.$router.push('/login')
    }, 2000);
    return false
  }
  return true
}

// TODO 11
export async function insertUser() {

}