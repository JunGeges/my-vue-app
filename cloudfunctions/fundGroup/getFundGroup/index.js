const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const db = app.database()
  const _ = db.command
  const { uid, groupId } = event

  const getResult = await db.collection('fund_user')
    .where({
      uid: _.eq(uid)
    })
    .field({
      _id: false,
      [`fundGroups.${groupId}.fundInfo`]: true
    })
    .get()
  return getResult.data[0].fundGroups[groupId].fundInfo || []

};
