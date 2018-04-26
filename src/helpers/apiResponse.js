module.exports.success = function(res, obj) {
    res.status(200).send({status: 'ok', statusCode: 200, result: obj, error: null });
};
module.exports.error = function(res, obj, statusCode=500) {
    res.status(statusCode).send({status: 'fail', statusCode: statusCode, result: null, error: obj }).end();
};