'use strict'

// PostgreSQL Initial Configuration
const postgres = require('./postgres')

module.exports = {
  postgres: () => {
    return postgres
  }
}
