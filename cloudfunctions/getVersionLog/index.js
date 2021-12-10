// 
const cloud = require('@cloudbase/node-sdk')
const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV
})
const db = app.database()
exports.main = async () => {
    return db.collection('fund_version_log').get()
}
