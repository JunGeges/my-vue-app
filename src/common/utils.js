export class User {
  constructor(obj) {
    const { email, password, uuid, crateTime } = obj
    this.email = email
    this.password = password
    // uuid
    this.uuid = uuid
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
  }
}