const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const db = app.database()
  const _ = db.command

  const {
    uid,
    groupIndex,
    Fcode,
    remainAmount
  } = event
  
  return await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    })
    .update({
      [`fundGroups.${groupIndex}.fundAmount.${Fcode}`]: remainAmount * 1 ? remainAmount : "",
      // 全部卖出
      ...(!(remainAmount * 1) && {
        [`fundGroups.${groupIndex}.fundCost.${Fcode}`]: ""
      })
    })
};