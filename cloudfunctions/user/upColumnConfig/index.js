const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const { uid, config } = event

  const db = app.database()

  const res = await db.collection('fund_user')
    .where({
      uid
    })
    .update({
      "config.columnOrder": config
    })
  return res
};