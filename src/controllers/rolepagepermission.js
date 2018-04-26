
const INSERT_PAGE_RELATION_API = "saveRolePageRelation({pageId},{pageTypeId}, '{roleIds}')";
const PAGES_LIST = "select role_id as roleId, pages_id as pageId, pages_type_id as pageTId from pages_role_permission_relation;";

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
    validationUtility.required(req.body, 'roleIds');
    if(!(req.body.roleIds instanceof Array) || req.body.roleIds.length == 0){
        throw new Error('roleIds not a valid array');
    }
    req.body.roleIds = req.body.roleIds.join(',');
    connection.callProcedure(res, INSERT_PAGE_RELATION_API.setParam(req.body) , (row)=>{
        responseHandler.success(res, req.body)
    });
})





module.exports = router