
const INSERT_APIS = "INSERT INTO `apis` (`uri`, `description`, `created`, `createdby`) VALUES ('{uri}', '{description}', now(), NULL);";

require('../helpers/dbUtility');
var express = require('express')
var connection = require('../db')
var httputilty = require('../helpers/httpUtility');
var validationUtility = require('../helpers/validationUtility')
var responseHandler = require('../helpers/apiResponse')


var router = express.Router()

router.get('/list', function (req, res) {
    connection.planeExecute(res, 'select * from apis');
})

router.post('/add', function (req, res) {    
    validationUtility.required(req.body, 'uri');
    validationUtility.required(req.body, 'description');
    connection.planeQuery(res, INSERT_APIS.setParam(req.body) , (row)=>{
        req.body.id = row.insertId;
        responseHandler.success(res, req.body)
    });
})





module.exports = router