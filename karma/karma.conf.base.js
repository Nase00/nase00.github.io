module.exports = {
  basePath: '.',
  frameworks: ['source-map-support', 'mocha'],
  reporters: ['dots'],
  files: [
    '../tests/config.js'
  ],
  preprocessors: {
    '../tests/config.js': ['webpack', 'sourcemap']
  },
  webpack: require('../webpack/webpack.test.config'),
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['Chrome', 'PhantomJS'],
  customLaunchers: {
    ChromeTravisCi: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },
  singleRun: true,
  webpackServer: {
    quiet: false,
    noInfo: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
};
