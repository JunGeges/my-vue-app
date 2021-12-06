
export async function getVersionLog() {
  console.log(this, 'this', isLogin.call(this));
  if (!isLogin.call(this)) return
  return await this.$cloudbase.database().collection('version_log').get()
}

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