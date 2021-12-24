const cloud = require("@cloudbase/node-sdk");
const insertUser = require('./insertUser/index')
const getUserInfo = require('./getUserInfo/index')
const upColumnConfig = require('./upColumnConfig/index')

exports.main = async (event, context) => {
  const { funName } = event
  cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const funs = {
    insertUser,
    getUserInfo,
    upColumnConfig
  }

  // 入口
  return funs[funName].main(event, context)
};