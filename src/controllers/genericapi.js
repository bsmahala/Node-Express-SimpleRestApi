require('../helpers/dbUtility');
var express = require('express')
var genericApi = require('../models/genericApi');
var responseHandler = require('../helpers/apiResponse')
var validationUtility = require('../helpers/validationUtility')
var httputilty = require('../helpers/httpUtility');
var connection = require('../db')

var router = express.Router()


router.get('/list', function (req, res) {    
    responseHandler.success(res, genericApi.getApiData());
})

router.post('/add', function (req, res) {    
     validationUtility.required(req.body, 'endpoint');
     validationUtility.required(req.body, 'sql');
     validationUtility.required(req.body, 'method');
     var data = genericApi.getApiData();
     if(data[req.body.endpoint]) {
         throw new Error('Api already exist for endpoint :' +req.body.endpoint);
     }
     data[req.body.endpoint] = {sql:req.body.sql,description:req.body.description, method: req.body.method, params: req.body.params};
     genericApi.write(data);
     responseHandler.success(res, data);
})


router.get('/exec/:endpoint', function (req, res) {
    var data = genericApi.getApiData();
    var sql = data[req.params.endpoint];
    if(!sql || sql.method !== 'get') {
        throw new Error("Api Not Found");
    }
    
    var queryParam = httputilty.queryParam(req);
    if(sql.params) {
        sql.params.forEach(e=> {
            if(e.required+'' === 'true') {
            validationUtility.required(queryParam, e.name);
            }
        })
    }
    connection.planeExecute(res, sql.sql.setParam(queryParam));
})

router.post('/exec/:endpoint', function (req, res) {
    var data = genericApi.getApiData();
    var sql = data[req.params.endpoint];
    if(!sql || sql.method !== 'post') {
        throw new Error("Api Not Found");
    }
    if(sql.params) {
       sql.params.forEach(e=> {
            if(e.required+'' === 'true')
            validationUtility.required(req.body, e.name);
        })
    }
    connection.planeExecute(res, sql.sql.setParam(req.body));
})


router.put('/exec/:endpoint', function (req, res) {
    var data = genericApi.getApiData();
    var sql = data[req.params.endpoint];
    if(!sql || sql.method !== 'put') {
        throw new Error("Api Not Found");
    }
    if(sql.params) {
       sql.params.forEach(e=> {
            if(e.required+''  === 'true')
            validationUtility.required(req.body, e.name);
        })
    }
    connection.planeExecute(res, sql.sql.setParam(req.body));
})



module.exports = router