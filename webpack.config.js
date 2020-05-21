module.exports = {
  devtool: 'source-map',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
            },
          },
        ],
      },
    ],
  },
};
