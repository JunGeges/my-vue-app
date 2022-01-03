const cloud = require("@cloudbase/node-sdk");
const insertUser = require('./insertUser/index')
const getUserInfo = require('./getUserInfo/index')
const upColumnConfig = require('./upColumnConfig/index')
const upBaseConfig = require('./upBaseConfig/index')
const updateFundGroups = require('./updateFundGroups/index')

exports.main = async (event, context) => {
  const {
    funName
  } = event
  cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const funs = {
    insertUser,
    getUserInfo,
    upColumnConfig,
    upBaseConfig,
    updateFundGroups
  }

  // 入口
  return funs[funName].main(event, context)
};