const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    files: [
      'src/*_spec.js'
    ],
    frameworks: [
      'jasmine',
      'sinon',
    ],
    preprocessors: {
      'src/*.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};

