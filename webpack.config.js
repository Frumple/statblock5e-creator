const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/js/init.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};