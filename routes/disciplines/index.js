'use strict'

// disciplines Router
const disciplines = require('express').Router()

// Functions under /
const getAllDisciplines = require('./getAllDisciplines')
// const createDisciplines = require('./createDisciplines')
const updateDiscipline = require('./updateDiscipline')
const deleteDiscipline = require('./deleteDiscipline')

// Endpoints
disciplines.get('/', getAllDisciplines)
disciplines.put('/', updateDiscipline)
disciplines.delete('/:id', deleteDiscipline)
// disciplines.post('/', createDisciplines)

module.exports = disciplines
