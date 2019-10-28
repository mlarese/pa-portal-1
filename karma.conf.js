var webpackConfig = require('./build/webpack.base.conf')

module.exports = function (config) {

  config.set({
    frameworks: ['mocha'],

    files: [
      'test/**/*.spec.js'
    ],
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['Chrome']
  })
}
