const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const { uid, funds } = event

  const res = await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    }).update({
      fundGroups: _.push(funds)
    })
  return res
};