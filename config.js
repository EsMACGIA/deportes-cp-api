'use strict'

// Loads .env file
const dotenv = require('dotenv')
dotenv.config()

const config = {
  port: process.env.PORT || 3000
}

module.exports = config
