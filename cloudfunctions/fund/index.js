const cloud = require("@cloudbase/node-sdk");
const deleteFund = require("./deleteFund/index")
const updateFundCostOrAmount = require("./updateFundCostOrAmount/index")
const sellFundAmount = require("./sellFundAmount/index")

exports.main = async (event, context) => {
  const { funName } = event
  cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });

  const funs = {
    deleteFund, //删除基金
    updateFundCostOrAmount, //修改持仓 加仓
    sellFundAmount //减仓
  }

  // 入口
  return funs[funName].main(event, context)
};
