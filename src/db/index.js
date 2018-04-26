var dbDetail = require('../constants/dbConfiguration');


var mysql = require('mysql')
var responseHandler = require('../helpers/apiResponse')

var connection = mysql.createConnection(dbDetail);

connection.connect()

connection.planeExecute = function(res, query) {
    connection.query(query, function(err, row, filed){
        if(err) {
            responseHandler.error(res, err.sqlMessage);
        } else {
            responseHandler.success(res, row);
        }
    })
}

connection.planeQuery = function(res, query, callback) {
    connection.query(query, function(err, row, filed){
        if(err) {
            responseHandler.error(res, err.sqlMessage);
        } else {
            callback(row, res)
        }
    })
}

connection.callProcedure = function(res, query, callback) {
    connection.query(`call ${query}`, function(err, row, filed){
        if(err) {
            responseHandler.error(res, err.sqlMessage);
        } else {
            callback(row, res)
        }
    })
}
connection.on('error', function(err){
    console.log(err.code);
});

module.exports = connection;
