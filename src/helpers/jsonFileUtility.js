'use strict';

const fs = require('fs');


module.exports.readFile = function(path) {
    
}
let rawdata = fs.readFileSync('student.json');  
let student = JSON.parse(rawdata);  
console.log(student);  