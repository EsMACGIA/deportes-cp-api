'use strict'

module.exports = async (err, req, res, next) => {

    if (err.code === 'invalid_token'){
        res.status(401)
        res.send({error: "Unauthorized"})
    }
    next()

}
