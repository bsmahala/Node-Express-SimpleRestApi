
var express = require('express')
var connection = require('../db')
var httputilty = require('../helpers/httpUtility');
var responseHandler = require('../helpers/apiResponse')
var validationUtility = require('../helpers/validationUtility')

var router = express.Router()

router.post('/login', function (req, res) {
    validationUtility.required(req.body, 'email');
    validationUtility.required(req.body, 'password');
    var query = `login('${req.body.email}', '${req.body.password}')`;
    connection.callProcedure(res, query, function(result){
        res.setHeader('Authorization', result[0][0].token);
        responseHandler.success(res, result[0][0])
    });
})

router.get('/logout', function (req, res) {
    validationUtility.condition(req.header('Authorization') === undefined, 'token not present in header');
    connection.planeQuery(res, `update loginhistory set expiretime = null, active = 0 where token = '${req.header('Authorization')}' `, function(result) {
        res.removeHeader('Authorization');
        responseHandler.success(res, 'successfully logout');
    });
})

module.exports = router