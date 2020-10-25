const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  baseUrl: 'http://127.0.0.1:8000/',
  outputDir: './dist/',
  chainWebpack: config => {
    config.optimization
      .splitChunks(false);
    config
      .plugin('BundleTracker')
      .use(BundleTracker, [{ filename: '../project-goban/webpack-stats.json' }]);
    config.resolve.alias
      .set('__STATIC__', 'static');
    config.devServer
      .public('http://127.0.0.1:8000')
      .host('0.0.0.0')
      .port(8080)
      .hotOnly(true)
      .watchOptions({ poll: 1000 })
      .https(false)
      .headers({ 'Access-Control-Allow-Origin': ['\*'] });
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/project-goban/'
    : '/'
};
