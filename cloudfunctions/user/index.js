const cloud = require("@cloudbase/node-sdk");
const insertUser = require('./insertUser/index')

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });


  // todo
  // your code here
  return insertUser.main(event, context)
};