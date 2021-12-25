const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  console.log(event)
  const { uid } = event

  const db = app.database()
  const res = await db.collection('fund_user')
    .where({
      uid
    })
    .field({
      password: 0,
      _id: 0
    })
    .get()
  return res.data[0]
};