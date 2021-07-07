// const crypto = require("crypto");
// const Users = require("./models/Users.model");

// const secret = () => {Users.findOne(req.session.username, function(err, foundUser) {return foundUser.password})}
// const iv = Buffer.alloc(16, 0);
// const hash = crypto.createHash("sha256", secret).update("I dwdd").digest("hex")
// console.log(hash)
// const text = crypto.createDecipheriv('aes-128-cbc', secret, iv);
// console.log(text)

// var output = ""
//
// for(var i=0; i<5; i++) {
// 	if(i === 0 || i === 4) {
// 		for(var j=0; j<=6; j++) {
// 			// console.log("*")
//             output += "*"
//         }
// 	} else {
// 		for(var j=0; j<=5; j++) {
// 			if(j === 0 || j === 5) {
// 				output += "*"
// 			} else {
// 				output += " "
// 			}
// 		}
// 	}
//     console.log(output)
//     output = ""
// }




var crypto = require('crypto');

var key = crypto.createCipher('aes-128-cbc', 'mypassword');
var key2 = crypto.createDecipher('aes-128-cbc', 'mypassword');

var hashcmessage = key.update('abc', 'utf8', 'hex')
hashcmessage += key.final('hex');

console.log(hashcmessage);

var strcmessage = key2.update(hashcmessage, 'hex', 'utf8')
strcmessage += key2.final('utf8');

console.log(strcmessage);  





