'use strict'

let StatsD = require('hot-shots')

module.exports = function(opts) {
  let statsd = new StatsD(opts)
  return (req, res, next) => {
    let start = new Date()
    let end = res.end

    res.end = (chunk, encoding) => {
      res.end = end
      res.end(chunk, encoding)

      let duration = new Date() - start
      statsd.timing('time', duration, 1, [`status-code:${res.statusCode}`])
    }
    next()
  }
}
