const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
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
      }
    }
  }
};