'use strict'

// Configuration 
const config = require('./config')

// Dependencies
const chalk = require('chalk')
const debug = require('debug')(`${config.debug}index`)
const express = require('express')

// Express.js Configuration
const app = express()

// Routing 
const routes = require('./routes')
app.use('/', routes)

// Router for 404 (Not Found)
app.get('*', (req, res) => {
  let body = {
    msg: 'Endpoint Not Found!'
  }

  res.status(400).send(body)
})

// Express.js Initializer
function initExpress() {
  app.listen(config.port, () => {
    console.log(`${chalk.green('[DeportesCP API]:')} Running on port ${chalk.green(config.port)}`)
  })
}

initExpress()

// Error Handling
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

function handleFatalError(err) {
  debug(`uncaughtException or unhandledRejection: ${err}`)
} 
