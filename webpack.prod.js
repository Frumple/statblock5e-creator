const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// eslint-disable-next-line no-unused-vars
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    // Uncomment to enable bundle size analysis
    // new BundleAnalyzerPlugin(),
  ],
});