'use strict';
var fs = require('fs');
var filePath = __dirname+ '/../constants/genericApis.json';

var gernericAdpiData = null;

function genericApiList() {
    let rawdata = fs.readFileSync(filePath);
    if(rawdata) {
        try {
        return JSON.parse(rawdata);
        } catch(e) {
        return {}
    }
}

    return {};
}



module.exports.write = function(object) {
    gernericAdpiData = object;
    fs.writeFileSync(filePath, JSON.stringify(object));    
}

module.exports.getApiData = function(uri) {
    if(gernericAdpiData == null)
    gernericAdpiData = genericApiList();

    return gernericAdpiData || {};
}
