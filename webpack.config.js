module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/js/index.js',
    home: './src/js/home/index.js'
  },
  output: {
    filename: '[name].js'
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
  }
};
