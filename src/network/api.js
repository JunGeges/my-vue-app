import {
  requestJR,
  requestTT
} from "./request";
import axios from 'axios'

export async function getFundDetail(Fcodes) {
  return await axios({
    url: 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo',
    params: {
      pageIndex: 1,
      pageSize: 50,
      plat: 'Android',
      appType: 'ttjj',
      product: 'EFund',
      Version: 1,
      deviceid: 'Wap',
      Fcodes
    }
  })
}

// 获取基金详细信息
export async function getFundDetailByTT(code) {
  return await requestTT({
    methods: 'get',
    url: `/api/pingzhongdata/${code}.js`
  })
}

// 获取基金实时信息
export async function getFundCurrentInfoByTT(code) {
  return await requestTT({
    // methods: 'get',
    url: `/bpi/js/${code}.js`
  })
}

// 获取基金详细信息
export async function getFundDetailByJR(code) {
  return await requestJR({
    methods: 'get',
    url: `/detail?code=${code}`
  })
}

// 获取基金基础信息 支持批量查询
/**
 * @desc ?code=xx,xx,xx 批量查询
 * @param {string} code 基金代码
 * @param {Date} startDate 开始日期
 * @param {Date} endDate 结束日期 可选
 */
export async function getFundBaseInfoByJR(code, startDate, endDate) {
  console.log(code, startDate, endDate)
  return await requestJR({
    url: `/detail/list?code=${code}&startDate=${startDate}&endDate=${endDate}`
  })
}

/** 
 *  @desc 获取基金排行数据 总共139页
 * */
export async function getFundRankByJR() {
  return await requestJR({
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
export async function getAllFundByJR() {
  return await requestJR({
    url: '/all'
  })
}

/**
 * @desc 获取基金持仓
 */
export async function getFundPositionByJR(code) {
  return await requestJR({
    url: `/position?code=${code}`
  })
}