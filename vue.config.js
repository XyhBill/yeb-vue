// let proxyObj ={}

// proxyObj['/'] = {
//   ws: false,
//   target: 'http://localhost:8081',
//   changeOrigin: true,
//   pathReWrite: {
//     '^/' : '/'
//   }
// }

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/acc': {
        target: 'https://www.fastmock.site/mock/3953a0c94bfed57444184920b15d29a7',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/acc': '/acc'
        }
      }
    }
  }
}