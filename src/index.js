var controllers = require('./controllers')
var router = require('express').Router()


router.use('/usermanagement', controllers)
// route export
module.exports = router