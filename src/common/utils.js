export class User {
  constructor(email, password, uid) {
    this.email = email
    this.password = password
    // uuid
    this.uid = uid
    // 创建时间
    this.crateTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm')

    this.config = {
      simpleMode: false, // 简洁模式
      showTag: true, // 显示估算标签
      showHP: true, //显示横屏
      upIsRed: false, // 绿涨红跌
      downIsSafe: false, // 无障碍模式
      columnOrder: [
        "gz", // 估算净值
        "sy", // 当日收益
        "syAll", // 持有收益
        "jz", // 净值
        "syAllL", // 持有收益率
        "moneyAfter", // 持仓份额
        "percentage" // 持仓占比
      ]
    }

    // 分组
    this.fundGroups = [{
      name: '默认分组',
      fundCode: [],
      fundAmount: {},
      fundCost: {}
    }]
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

export function updateStorage(v) {
  try {
    var vuexStorage = JSON.parse(localStorage.getItem('vuex'))
    if (!vuexStorage) return
    vuexStorage[v] = v
    localStorage.setItem('vuex', JSON.stringify(vuexStorage))
  } catch (error) {
    console.log(error)
  }
}