'use strict'

// Project Configuration
const config = require('../../config')

// PostgreSQL Drivers
const TinyPg = require('tinypg').TinyPg
const Path = require('path')

// Connection String Initialization
var connectionString = process.env.DATABASE_URL || null

if (!connectionString) {
  connectionString = `postgres://${config.postgres.user}:${config.postgres.password}@postgres:${config.postgres.port}/${config.postgres.db}?sslmode=disable`
}

// Database Configuration
const db = new TinyPg({
  connection_string: connectionString,
  root_dir: Path.join(__dirname, './queries')
})

module.exports = db
