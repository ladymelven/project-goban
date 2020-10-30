module.exports = {
  outputDir: '../goban/static/goban/',
  indexPath: '../../templates/goban/base-vue.html',

  chainWebpack: config => {
    config.devServer
      .public('http://127.0.0.1:8080')
      .hotOnly(true)
      .headers({ 'Access-Control-Allow-Origin': '*' })
      .writeToDisk(filePath => filePath.endsWith('index.html'));
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/static/goban/'
    : '/'
};
