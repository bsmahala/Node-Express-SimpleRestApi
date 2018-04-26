
var router = require('express').Router()
const bodyParser = require("body-parser");
var responseHandler = require('../helpers/apiResponse')

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
router.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
router.use(bodyParser.json());
router.use(function(req, res, next){
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Expose-Headers', 'Authorization');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    console.log(req.headers.authorization)
    if(req.headers.authorization) {
        res.setHeader('Authorization', req.headers.authorization);
    }
    next();
 });
// import controllers 
var users = require('./users')
var auth = require('./auth')
var apis = require('./apis')
var pages = require('./pages')
var pagetype = require('./pagetype')
var pageapirelation = require('./pageapirelation')
var roles = require('./roles')
var rolepagepermission = require('./rolepagepermission')
var genericApi = require('./genericapi')

// register route for user controller
router.use('/users', users)
router.use('/auth', auth)
router.use('/apis', apis)
router.use('/pages', pages)
router.use('/pagetypes', pagetype)
router.use('/pageapirelation', pageapirelation)
router.use('/roles', roles)
router.use('/rolepagepermission', rolepagepermission)
router.use('/genericapi', genericApi)





//
router.use(function(req, res){
    res.sendStatus(404)
    responseHandler.error(res,"Api Not Found", 404);
});

router.use(function(error, req, res, next) {
    responseHandler.error(res, error.message);
  });
// route export
module.exports = router