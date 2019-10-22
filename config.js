'use strict'

// Loads .env file
const dotenv = require('dotenv')
dotenv.config()

const config = {
  // Express.js
  port: process.env.PORT || 3000,

  // PostgreSQL
  postgres: {
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    port: process.env.POSTGRES_PORT || '',
    db: process.env.POSTGRES_DB || ''
  },

  // Hashing.js
  salt: process.env.SALT || '',
  
  // Debug
  debug: 'deportes-cp-api:'
}

module.exports = config
