'use strict'

// Dependencies
const chalk = require('chalk')
const debug = require('debug')('deportes-cp-api:index')
const express = require('express')

// Express.js Configuration
const app = express()

// Configuration 
// TODO: Export to a config.js file
const port = 3000

// TODO: This should be not here, export to a file
// GET
app.get('/', (req, res) => {
  let body = {
    nameserver: 'DeportesCP Backend',
    author: 'MACGIA',
    port: '3000'
  }

  res.send(body)
})

// Router for 404 (Not Found)
app.get('*', (req, res) => {
  let body = {
    msg: 'Endpoint Not Found!'
  }

  res.status(400).send(body)
})

// Express.js Initializer
function initExpress() {
  app.listen(port, () => {
    console.log(`${chalk.green('[DeportesCP API]:')} Running on port ${chalk.green(port)}`)
  })
}

initExpress()

// Error Handling
process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

function handleFatalError(err) {
  debug(`uncaughtException or unhandledRejection: ${err}`)
} 
