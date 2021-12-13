const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const { uid, groupId, costUnitPrice, fundCode, positionAmount } = event

  return await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    }).update({
      [`fundGroups.${groupId}.fundInfo`]: _.push({ costUnitPrice, fundCode, positionAmount })
    })
};