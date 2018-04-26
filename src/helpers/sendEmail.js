var nodemailer = require('nodemailer');
var exports = module.exports = {};
/*
 Create Transport and ready to send email via gmail or smtp
*/
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});


/*
 Send mail 
 @param {string} from
 @param {string} to
 @param {string} subject
 @param {string} text
 @param {string} callback
*/
exports.sendMail = function(from, to, subject, text, callback=function(){}) {
    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            callback('error', error)
        } else {
            callback('success', info.response)
        }
      });
}