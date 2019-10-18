'use strict'

// Users Router
const users = require('express').Router()

// Functions under /
const getAllUsers = require('./getAllUsers')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')

// Endpoints
users.get('/', getAllUsers)
users.put('/', updateUser)
users.delete('/:id', deleteUser)

module.exports = users
