const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// const fs = require('fs')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

module.exports = defineConfig({
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false  // exclude all comments from output
      }
      return args
    })
  },
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
  runtimeCompiler: true,
  devServer: {
    hot: false,
    liveReload: false,
    host: '0.0.0.0',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: true,
    allowedHosts: 'all'
  },
  transpileDependencies: true,
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
    devtool: false,
    plugins: [
      new WebpackManifestPlugin({fileName: 'image-manifest.json', filter: (file) => {
        return /img\//.test(file.path)
      }})
    ]
  },
  // pwa: {
  //   name: 'Visi8 Webcomic',
  //   themeColor: "#42b983",
  //   msTileColor: "#42b983",
  //   appleMobileWebAppCache: "yes",
  //   manifestOptions: {
  //     background_color: "#42b983"
  //   },
  //   workboxPluginMode: "InjectManifest",
  //   workboxOptions: {
  //       swSrc: "./src/service-worker.js"
  //   },
  // }
})
