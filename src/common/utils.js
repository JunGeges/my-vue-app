export class User {
  constructor(email, password, uid, crateTime) {
    this.email = email
    this.password = password
    // uuid
    this.uid = uid
    // 创建时间
    this.crateTime = crateTime
    // 绿涨红跌
    this.color = 0
    // 简洁模式
    this.simpleMode = 0
    // 切换横竖屏
    this.switchScreen = 0
    // 无障碍模式
    this.accessibilityMode = 0

    // 估算净值
    this.estimatedNetWorth = 1
    // 估算标签
    this.estimationLabel = 1
    // 当日收益
    this.dailyIncome = 1
    // 持有收益
    this.holdIncome = 1
    // 净值
    this.netWorth = 1
    // 持有收益率
    this.holdIncomeRate = 1
    // 持仓金额
    this.positionAmount = 1
    // 持仓占比
    this.positionAmountRate = 1

    // 分组
    this.fundGroups = {
      [Math.random().toString(16).slice(2, 10)]: {
        groupTitle: '默认分组',
        index: 0,
        fundCount: 0,
        fundInfo: [

        ]
      }
    }
  }
}

// 时间格式化函数
export function formatDate(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}