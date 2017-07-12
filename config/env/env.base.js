var moment = require('moment')

module.exports = {
  BUILD_TIME: "'" + moment().format('YYYY.MM.DD - HH:mm:ss') + "'"
}
