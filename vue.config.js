const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true, //设置是否在开发环境下每次保存代码都启用eslint验证
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('network', resolve('src/network'))
      .set('store', resolve('src/store'))
      .set('common', resolve('src/common'))
  },

  // http://fund.eastmoney.com
  devServer: {
    proxy: {
      '/api': {
        target: 'http://fund.eastmoney.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/bpi': {
        target: 'http://fundgz.1234567.com.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/bpi': ''
        }
      },
      '/FundMApi': {
        target: 'https://fundmobapi.eastmoney.com',
        ws: true,
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/FundMApi': '/FundMApi'
        }
      }
      // https://fundmobapi.eastmoney.com/FundMApi/FundNetDiagram.ashx?FCODE=161725&RANGE=y&deviceid=Wap&plat=Wap&product=EFund&version=2.0.0&_=1641349674144
    }
  }
};