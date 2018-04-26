var pug = require('pug');
// Compile a function
var fn = pug.compileFile('./welcomemail.pug', {});

// build html for welcome template
export function welcomeTemplate(name, otp) {
    return fn({name: name, otp: otp});
}