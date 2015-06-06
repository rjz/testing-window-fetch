var path = require('path');
var project = require('./package');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: project.name + '.js'
  },
  module: {
    loaders: [
      { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    moduleDirectories: ['node_modules']
  }
};

