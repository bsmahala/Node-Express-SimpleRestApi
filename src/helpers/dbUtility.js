var exports = module.exports = {};


if (!String.prototype.setParam) {
    String.prototype.setParam = function(obj) {
      var args = arguments;
      return this.replace(/\{(.*?)\}/g, function(match, number) { 
          return obj[number] === undefined ? 'null' : obj[number];
      });
    };
  }
