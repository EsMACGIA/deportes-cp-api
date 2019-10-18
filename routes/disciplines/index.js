'use strict'

// disciplines Router
const disciplines = require('express').Router()

// Functions under /
const getAllDisciplines = require('./getAllDisciplines')
const createDiscipline = require('./createDiscipline')
const updateDiscipline = require('./updateDiscipline')
const deleteDiscipline = require('./deleteDiscipline')

// Endpoints
disciplines.get('/', getAllDisciplines)
disciplines.put('/', updateDiscipline)
disciplines.delete('/:id', deleteDiscipline)
disciplines.post('/', createDiscipline)


module.exports = disciplines
