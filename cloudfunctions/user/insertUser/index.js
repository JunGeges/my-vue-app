const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const { uid } = event

  const db = app.database()
  delete event.funName
  const data = event

  const isExistUser = await db.collection('fund_user')
    .where({
      uid
    })
    .get()
  // 如果存在用户
  if (isExistUser.data.length !== 0) return
  // 如果不存在用户 插入user表
  return await db.collection('fund_user').add(data)
    .then(res => {
      if (res.code) return res.message
      return '注册成功~'
    }).catch(err => {
      console.log(err);
      return '注册失败~'
    })
};

// 生成一个默认的基金分组
