
'use strict'
const path = require('path')
const GenerateAssetPlugin = require('generate-asset-webpack-plugin') // vue配置外放
const CompressionWebpackPlugin = require('compression-webpack-plugin') // js压缩
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const config = require('./config/app-config.json')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}
function createServerConfig(compilation) {
  return JSON.stringify(
    Object.assign({
      _hash: compilation.hash
    }, config)
  )
}
// https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: process.env.PORT,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
    // proxy: {
    //   '/mock': {
    //     target: process.env.VUE_APP_BASE_API,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/mock': '' // 将/api开头的请求地址的/api替换为''
    //     }
    //   }
    // }
  },
  configureWebpack: {
    name: config.siteName,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      library: process.env.OUTPUT_LIBRARY,
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      libraryTarget: 'umd',
      // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
      jsonpFunction: process.env.JOUTPUT_SONP_FUNCTION
    },
    plugins: [
      new GenerateAssetPlugin({
        filename: 'config/app-config.json',
        fn: (compilation, cb) => {
          cb(null, createServerConfig(compilation))
        }
      }),
      // 配置compression-webpack-plugin压缩
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        // test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  },
  css: {
    loaderOptions: {
      // 这里的选项会传递给 css-loader
      sass: {
        prependData: `
                        @import "~@/styles/index.scss";
                       `
      }
    }
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
