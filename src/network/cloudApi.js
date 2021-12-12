import cloudRequest from "./cloudRequest";
import {
  User,
  getUserInfoByStorage
} from '../common/utils'
import {
  CHANGE_LOGIN_STATE
} from 'store/mutations-type'
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
      if (isLogin === 0) {
        // 登录成功
        this.$router.go(-1)
        // 登录状态存vuex
        this.$store.commit({
          type: CHANGE_LOGIN_STATE,
          hasLoginState: loginState
        });

        console.log('loginState-----', loginState.user.email)
        // 存数据库
        const {
          email,
          password,
          createTime,
          uid
        } = loginState.user
        console.log('click', email, password, createTime, uid)
        console.log('user==', {
          ...new User(email, password, uid, createTime),
          funName: 'insertUser'
        })
        cloudRequest('user', {
          ...new User(email, password, uid, createTime),
          funName: 'insertUser'
        })
      } else {
        // 发送邮件成功 需要登录邮箱点链接 激活账号
        this.$toast({
          message: '账号激活链接已发送到您的邮箱,请前往激活~',
          duration: 3000
        })
      }
    })
    .catch((err) => {
      this.$toast(`${isLogin === 0 ? '账号或密码有误!' : '注册失败!'}`)
      console.log(err);
    });
}

// 退出登录
export async function singOut() {
  return await this.$cloudbase.auth().signOut()
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