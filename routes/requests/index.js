'use strict'

// requests Router
const requests = require('express').Router()

// Functions under /
const getAllRequests = require('./getAllRequests')
const createRequest = require('./createRequest')


// Endpoints
requests.get('/', getAllRequests)
requests.post('/', createRequest)


module.exports = requests

