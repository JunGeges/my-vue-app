/**
 * @desc 获取版本日志
 * @returns 版本记录
 */
export async function getVersionLog() {
  console.log(this, 'this', isLogin.call(this));
  if (!isLogin.call(this)) return
  return await this.$cloudbase.database().collection('version_log').get()
}

// 是否登录云开发 记录登录状态
function isLogin() {
  const result = this.$cloudbase.auth().hasLoginState()
  if (!result) {
    this.$toast({
      message: '未登录,即将去登录~'
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