const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const $ = db.command.aggregate
  const { uid, groupId, costUnitPrice, fundCode, positionAmount } = event

  // 先判断是否是重复的基金
  const getResult = await db.collection('fund_user')
    .where({
      uid:_.eq(uid)
    })
    .field({
      _id: false,
      [`fundGroups.${groupId}.fundInfo`]: true
    })
    .get()
  const isExist = getResult.data[0].fundGroups[groupId].fundInfo.find(item => item.fundCode === fundCode)

  if(isExist) return '分组内已存在该基金~'
    
  return await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    }).update({
      [`fundGroups.${groupId}.fundInfo`]: _.push({ costUnitPrice, fundCode, positionAmount })
    })
};