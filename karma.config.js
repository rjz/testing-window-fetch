module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test/runner.js', watched: false }
    ],
    frameworks: [
      'jasmine',
      'sinon'
    ],
    //singleRun: true,
    preprocessors: {
      'test/runner.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' }
        ]
      },
      watch: true
    },
    webpackServer: {
      noInfo: true
    }
  });
};

