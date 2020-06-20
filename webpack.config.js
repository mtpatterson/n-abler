const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/js/index.js',
    home: './src/js/home/index.js',
    search: './src/js/search/index.js'
  },
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    library: '_NA.[name]',
    libraryTarget: 'assign'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            failOnError: true
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, './src/js')
    }
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'var _NA = _NA || {};', // gives us a common global namespace to attach our modules to
      raw: true,
      entryOnly: true
    })
  ]
};
