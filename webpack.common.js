module.exports = {
  entry: './src/js/init.js',
  output: {
    filename: 'app.bundle.js'
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: '[name].bundle.js',
          chunks: 'all'
        }
      }
    }
  },
};