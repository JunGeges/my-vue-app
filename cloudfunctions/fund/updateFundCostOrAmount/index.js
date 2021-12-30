const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const db = app.database()
  const _ = db.command

  const { uid, groupIndex, Fcode, cost, amount } = event



  return await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    })
    .update({
      [`fundGroups.${groupIndex}.fundCost.${Fcode}`]: cost,
      [`fundGroups.${groupIndex}.fundAmount.${Fcode}`]: amount
    })
};