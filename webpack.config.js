const path = require('path');
const { name } = require('./package.json');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  },
};
