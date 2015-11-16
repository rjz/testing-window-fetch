module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    files: [
      'node_modules/babel-core/browser-polyfill.min.js',
      'node_modules/whatwg-fetch/fetch.js',
      'src/*_spec.js'
    ],
    frameworks: [
      'jasmine',
      'sinon'
    ],
    preprocessors: {
      'src/*_spec.js': [ 'webpack' ],
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            loader: 'babel'
          }
        ]
      },
      cache: true,
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};

