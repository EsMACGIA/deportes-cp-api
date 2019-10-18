'use strict'

// Users Router
const users = require('express').Router()

// Functions under /
const getAllUsers = require('./getAllUsers')

// Endpoints
users.get('/', getAllUsers)

module.exports = users
