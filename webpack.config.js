require('babel-core/register')
module.exports = require(`./webpack/${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`)
