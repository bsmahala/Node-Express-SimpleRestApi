
const INSERT_PAGE_RELATION_API = "saveApiPageRelation({pageId},{pageTypeId}, '{apiIds}')";
const PAGES_LIST = "select apis_id as apiId, pages_id as pageId, pages_type_id as pageTId from pages_apis_relation;";

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

router.post('/update', function (req, res) {    
    validationUtility.required(req.body, 'pageId');
    validationUtility.required(req.body, 'pageTypeId');
    validationUtility.required(req.body, 'apiIds');
    if(!(req.body.apiIds instanceof Array) || req.body.apiIds.length == 0){
        throw new Error('apiIds not a valid array');
    }
    req.body.apiIds = req.body.apiIds.join(',');
    connection.callProcedure(res, INSERT_PAGE_RELATION_API.setParam(req.body) , (row)=>{
        responseHandler.success(res, req.body)
    });
})





module.exports = router