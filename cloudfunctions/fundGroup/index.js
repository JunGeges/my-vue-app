const cloud = require("@cloudbase/node-sdk");
const getFundGroup = require('./getFundGroup/index')
const addFundGroup = require('./addFundGroup/index')
const addFundToGroup = require('./addFundToGroup/index')


exports.main = async (event, context) => {
  const { funName } = event
  cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const funs = {
    getFundGroup, // 查基金分组
    addFundGroup, //添加基金分组
    addFundToGroup, //添加基金到分组
  }

  // 入口
  return funs[funName].main(event, context)
};