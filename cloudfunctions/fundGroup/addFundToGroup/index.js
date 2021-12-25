const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const $ = db.command.aggregate
  const { uid, costUnitPrice, fundCode, positionShare,groupIndex } = event

  // 先判断是否是重复的基金
  const res = await db.collection('fund_user')
    .where({
      uid:_.eq(uid)
    })
    .field({
      _id: false,
      fundGroups: true
    })
    .get()
  const targetGroup = res.data[0].fundGroups[groupIndex]
  const isExist = targetGroup.fundCode.find(item => item === fundCode)
  
  // return { [`fundGroups[${groupIndex}].fundCode`]:1}
  if(isExist) return '分组内已存在该基金~'
    
  return await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    })
    .update({
      [`fundGroups.${groupIndex}.fundCode`]: _.push(fundCode),
      [`fundGroups.${groupIndex}.fundCost.${fundCode}`]: costUnitPrice,
      [`fundGroups.${groupIndex}.fundAmount.${fundCode}`]: positionShare
    })
};