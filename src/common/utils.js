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

export function getUserInfoByStorage() {
  const key = "user_info_jun-9gidxtgo5a18dce9"
  const result = JSON.parse(localStorage.getItem(key));
  if (result) {
    return {
      ...result.content
    }
  }
}