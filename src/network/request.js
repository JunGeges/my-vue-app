import axios from 'axios'
import {
  Toast
} from 'vant';
// 金融数据接口 https://www.doctorxiong.club/api/#api-Fund
export function requestJR(config) {
  const instanceJR = axios.create({
    baseURL: 'https://api.doctorxiong.club/v1/fund',
    timeout: 2000,
  })

  //请求拦截
  instanceJR.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  instanceJR.interceptors.response.use(res => {
    console.log('res----', res)
    // 错误码
    const errCode = [400, 412, 500, 405, 202]
    if (errCode.includes(res.data.code)) {
      console.log('进来了', errCode.find(() => errCode.includes(res.data.code)))
      return new Promise((reslove, reject) => {
        reject('错误')
      })
    }
    return res.data
  }, err => {
    console.log(err)
  })
  return instanceJR(config)
}

// 天天基金
export function requestTT(config) {
  console.log(window,'this')
  const instanceTT = axios.create({
    timeout: 2000
  })

  //请求拦截
  instanceTT.interceptors.request.use(config => {
    return config
  }, err => {
    return Promise.reject(err)
  })

  instanceTT.interceptors.response.use(res => {
    console.log(res, '222oooss')
    // 错误码

    return res.data
  }, err => {
    console.log('err.response.status', err.response.status)
    if (err.response.status) {
      switch (err.response.status) {
        case 404:
          alert('基金代码错误')
          console.log(this)
          Toast({
            message: '基金代码错误'
          })
          break
      }
    }
    return Promise.reject(err.response)
  })

  return instanceTT(config)
}