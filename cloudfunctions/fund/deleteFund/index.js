const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const db = app.database()
  const _ = db.command

  const { uid, groupIndex, Fcode } = event



  return await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    })
    .update({
      [`fundGroups.${groupIndex}.fundCode`]: _.pull(Fcode),
      [`fundGroups.${groupIndex}.fundCost.${Fcode}`]: _.remove(),
      [`fundGroups.${groupIndex}.fundAmount.${Fcode}`]: _.remove()
    })
};
