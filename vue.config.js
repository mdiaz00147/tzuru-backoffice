module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    port: 3000,   // you can change the port there
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].chunksSortMode = 'none'
        return args
      })
  }
}
