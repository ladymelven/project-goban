const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  outputDir: './dist/',
  chainWebpack: config => {
    config.optimization
      .splitChunks(false);
    config
      .plugin('BundleTracker')
      .use(BundleTracker, [{ filename: '..project-goban/webpack-stats.json' }]);
    config.resolve.alias
      .set('__STATIC__', 'static');
    config.devServer
      .public('http://127.0.0.1:8080')
      .host('127.0.0.1')
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
