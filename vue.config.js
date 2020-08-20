const isProduction = process.env.NODE_ENV === 'production';
const timeNow = new Date().getTime()
module.exports = {
  lintOnSave:false,
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: "http://192.168.2.56:3000", // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
      "/mysql": {
        target: "http://localhost:8888", // 域名
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      },
    },
    open: true
  },

  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,

  configureWebpack: config => {
    if (isProduction) {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
      config.output.filename = `[name].${timeNow}.js`
      config.output.chunkFilename = `[name].${timeNow}.js`
    }
  }
};
