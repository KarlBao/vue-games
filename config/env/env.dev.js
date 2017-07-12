var merge = require('webpack-merge')
var baseEnv = require('./env.base')

module.exports = merge(baseEnv, {
  NODE_ENV: '"development"'
})
