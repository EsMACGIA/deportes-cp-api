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
  debug: 'deportes-cp-api:',

  // Email
  email: {
    account: process.env.EMAIL_ACCOUNT,
    password: process.env.EMAIL_PASSWORD
  }
  // JWT
  jwt_key: process.env.JWT_KEY || '123456789'
}

module.exports = config
