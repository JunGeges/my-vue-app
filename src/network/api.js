import {
  requestJR,
  requestTT
} from "./request";

// 获取基金详细信息
export function getFundDetailByTT(code) {
  return requestTT({
    methods: 'get',
    url: `/api/pingzhongdata/${code}.js`
  })
}

// 获取基金实时信息
export function getFundCurrentInfoByTT(code) {
  return requestTT({
    // methods: 'get',
    url: `/bpi/js/${code}.js`
  })
}

// 获取基金详细信息
export function getFundDetailByJR(code) {
  return requestJR({
    methods: 'get',
    url: `/detail?code=${code}`
  })
}

// 获取基金基础信息 支持批量查询
/**
 * @desc ?code=xx,xx,xx 批量查询
 * @param {any} code 基金代码
 */
export function getFundBaseInfoByJR(code) {
  return requestJR({
    url: `?code=${code}`
  })
}

/** 
 *  @desc 获取基金排行数据 总共139页
 * */
export function getFundRankByJR() {
  return requestJR({
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    url: '/rank',
    data: {
      "fundType": ["zs"],
      "sort": "z",
      "fundCompany": ["80000248"],
      "pageIndex": 139,
      "pageSize": 10
    }
  })
}

/**
 * 
 * @desc 获取所有的基金
 */
export function getAllFundByJR() {
  return requestJR({
    url: '/all'
  })
}

/**
 * @desc 获取基金持仓
 */
export function getFundPositionByJR(code) {
  return requestJR({
    url: `/position?code=${code}`
  })
}