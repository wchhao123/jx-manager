'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/jx-manage': {
        // target: 'https://admin.99payroll.cn/jx-manage',      // 生产
      target: 'http://jxtest.99payroll.cn/jx-manage',      // test
        // target: 'http://192.168.3.187:8092/jx-manage',      // devnpm
        // target: 'http://172.18.0.230:8092/jx-manage',   // jjn
        //target: 'http://localhost:8092/jx-manage',   //昌海同学
        // target: 'http://172.18.1.85:8092/jx-manage',   //江智豪
     // target: 'http://192.168.120.244:8092/jx-manage',
        changeOrigin: true,
        pathRewrite: {
          '^/jx-manage': ''
        },
      },
      '/joc-api': {
        target: 'http://uat.jia-fu.cn/joc-api',
        // target: 'http://192.168.99.88:7088/',
        changeOrigin: true,
        pathRewrite: {
          '^/joc-api': ''
        },
      },
      '/api': {
        target: 'http://api.map.baidu.com/api',
        // target: 'http://192.168.99.88:7088/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
      '/jx-ent': {
        target: 'https://jxdev.99payroll.cn/jx-ent',
        changeOrigin: true,
        pathRewrite: {
          '^/jx-ent': ''
        }
      }
    },

    // proxyTable: {
    //   '/joc-api': {
    //     target: 'http://uat.jia-fu.cn/joc-api',
    //     // target: 'http://192.168.99.63:7088/',
    //     // target: 'http://192.168.99.88:7088/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/joc-api': ''
    //     },
    //   }
    // },

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './', // 生产
    // assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
