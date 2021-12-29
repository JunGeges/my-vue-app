const cloud = require("@cloudbase/node-sdk");
const deleteFund = require("./deleteFund/index")

exports.main = async (event, context) => {
  const { funName } = event
  cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const funs = {
    deleteFund
  }

  // 入口
  return funs[funName].main(event, context)
};
