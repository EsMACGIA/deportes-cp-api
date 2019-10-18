'use strict'

// Loads .env file
const dotenv = require('dotenv')
dotenv.config()

const config = {
  // Express.js
  port: process.env.PORT || 3000,

  // PostgreSQL
  postgres: {
    user: config.POSTGRES_USER || '',
    password: config.POSTGRES_PASSWORD || '',
    port: config.POSTGRES_PORT || '',
    db: config.POSTGRES_DB || ''
  }
}

module.exports = config
