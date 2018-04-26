
const INSERT_PAGES = "INSERT INTO `pages` (`name`, `description`, `created`, `createdby`) VALUES ('{name}', '{description}', now(), NULL);";
const PAGES_LIST = "select * from pages;";

require('../helpers/dbUtility');
var express = require('express')
var connection = require('../db')
var httputilty = require('../helpers/httpUtility');
var validationUtility = require('../helpers/validationUtility')
var responseHandler = require('../helpers/apiResponse')


var router = express.Router()

router.get('/list', function (req, res) {
    connection.planeExecute(res, PAGES_LIST);
})

router.post('/add', function (req, res) {    
    validationUtility.required(req.body, 'name');
    validationUtility.required(req.body, 'description');
    connection.planeQuery(res, INSERT_PAGES.setParam(req.body) , (row)=>{
        req.body.id = row.insertId;
        responseHandler.success(res, req.body)
    });
})





module.exports = router