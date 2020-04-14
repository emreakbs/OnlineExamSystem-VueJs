module.exports = {
  publicPath: '/',
  devServer: {
    host: "onlinesinav.local"
  },
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}

