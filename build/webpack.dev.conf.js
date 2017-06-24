var utils = require('./utils')
var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var plugins = [
  new webpack.DefinePlugin({
    'process.env': config.dev.env
  }),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin()
]

var projects = utils.getProjects()
var HtmlWebpackPluginConfigs = {}

// 配置项目文件
projects.forEach(project => {
  var projectJSON = require(project + '/project.json')
  var name = projectJSON.name

  // 配置生成的html文件，定义路径等
  var conf = {
    title: projectJSON.title,
    filename: name + '.html',
    template: project + '/' + projectJSON.template, //模板路径
    inject: true,
    chunks: [name]
  }

  HtmlWebpackPluginConfigs[name] = conf

  // 配置并插入多个htmlWebpackPlugin
  plugins.push(new HtmlWebpackPlugin(conf))
})

// 配置入口文件
plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.resolve(__dirname, '../index.html'),
  inject: true,
  availableProjects: HtmlWebpackPluginConfigs,
  chunks: []
}))

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugins
})
