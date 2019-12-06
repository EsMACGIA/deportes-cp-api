'use strict'

const jwt = require('express-jwt');
const config = require('../../config')

// requests Router
const requests = require('express').Router()

// Functions under /
const getAllRequests = require('./getAllRequests')
const createRequest = require('./createRequest')
const updateRequest = require('./updateRequest')
const handleErrorToken = require('../errors/handleErrorToken')

//error handling
requests.use('/',jwt({secret: config.jwt_key}), handleErrorToken)

// Endpoints
requests.put('/',jwt({secret: config.jwt_key}), updateRequest)
requests.get('/',jwt({secret: config.jwt_key}), getAllRequests)
requests.post('/',jwt({secret: config.jwt_key}), createRequest)


module.exports = requests

