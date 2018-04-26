
var express = require('express')
var connection = require('../db')
var httputilty = require('../helpers/httpUtility');
var validationUtility = require('../helpers/validationUtility')
var router = express.Router()

router.get('/list', function (req, res) {    
    var pg = httputilty.paginationGet(req);
    connection.planeExecute(res, 'select * from users limit '+ pg.offset + ',' + pg.limit)     
})
router.get('/list/:id', function (req, res) {
    connection.planeExecute(res, 'select * from users where id = '+ req.params.id)
})

router.get('/list/proj/:id', function (req, res) {
    validationUtility.number(req.params, 'id');
    connection.planeExecute(res, 'select name from users where id = '+ req.params.id)
})


module.exports = router