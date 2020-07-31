const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/js/index.tsx',
    search: './src/js/search/index.tsx'
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    library: '_NA.[name]',
    libraryTarget: 'assign'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            failOnError: true
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, './src/js')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'var _NA = _NA || {};', // gives us a common global namespace to attach our modules to
      raw: true,
      entryOnly: true
    })
  ]
};
