import cloudRequest from "./cloudRequest";
import {
  User
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
  return this.$cloudbase
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
        // 存数据库
        const {
          email,
          uid
        } = loginState.user
        // console.log(uid)
        cloudRequest('user', {
          ...new User(email, password, uid),
          funName: 'insertUser'
        })
        return uid
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

/**
 * @desc 新增分组
 * @param {Array} fundGroup 可以是基金数组和基金对象
 * @returns 
 */
export async function addFundGroup(fundGroup) {
  return await cloudRequest('fundGroup', {
    funName: 'addFundGroup',
    fundGroup
  })
}

/**
 * 添加基金到分组
 * @param {string} groupIndex 分组索引
 * @param {{}} fund 添加的基金对象信息 
 */
export async function addFundToGroup(groupIndex, fund) {
  if (!fund) return Promise.reject('参数错误~')
  console.log({
    groupIndex
  })
  return await cloudRequest('fundGroup', {
    funName: 'addFundToGroup',
    groupIndex,
    ...(fund && fund)
  })
}

/**
 * 通过groupId获取分组基金
 * @param {*} groupId 分组id
 */
export async function getFundGroup(groupId) {
  return await cloudRequest('fundGroup', {
    funName: 'getFundGroup',
    groupId
  })
}

/**
 * 根据索引删除分组
 * @param {Number} deleteIndex 
 * @returns 
 */
export async function deleteFundGroup(deleteIndex) {
  return await cloudRequest('fundGroup', {
    funName: 'deleteFundGroup',
    deleteIndex
  })
}

/**
 * 查询用户信息
 * @returns 
 */
export async function getUserInfo() {
  return await cloudRequest('user', {
    funName: 'getUserInfo'
  })
}

/**
 * 配置自定义列
 * @param {Array} config 自定义列
 */
export async function upColumnConfig(config) {
  return await cloudRequest('user', {
    funName: 'upColumnConfig',
    config
  })
}