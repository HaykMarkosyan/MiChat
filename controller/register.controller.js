const nodemailer = require("nodemailer");
const md5 = require("md5");
const validator = require("validator")

const Users = require("../models/Users.model");

const userRegister = async (req, res) => {
  if (!req.session.loggedin) {
    const registeruser = {
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      imgname: "",
      password: req.body.password,
      bio: ""
    };

    if (registeruser.username.length < 3) {
      res.redirect("/register")
    } else if (registeruser.password.length < 6) {
      res.render("register", {u: true, p: false });
    } else {
      registeruser.password = md5(registeruser.password);
    }

    req.session.registeruserinfo = registeruser;

    Users.findOne(
      { username: req.session.registeruserinfo.username },
      function (err, foundUsername) {
        if (foundUsername) {
          return res.render("register", { e: true, u: false });
        } else {
             res.redirect(`/register/${registeruser.username}`)
        }
      }
    );
  }
};

const emailSend = (req, res) => {
    
  try {
      const username = req.params.username;
      
      if(typeof username == undefined){
          return res.redirect("/register")
      }
    
      if (!req.session.loggedin && username == req.session.registeruserinfo.username && validator.isEmail(req.body.email)) {
          req.session.email = req.body.email
          
        var vcode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        req.session.vcode = vcode;
    
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'emisketam@gmail.com',
        pass: 'emishtecmeruk'
        }
        });
    
        var mailOptions = {
            from: 'michatweb@gmail.com',
            to: req.session.email,
            subject: 'Verifying your email address',
            text: `Hi, ${req.session.registeruserinfo.fname}\nYour code is: ${req.session.vcode}\nThanks for registering in our website!`
        };
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect(`/register/verify/${req.session.registeruserinfo.username}`)
            }
        });
      } else {
        return res.redirect("/")
      }

  } catch(err) {
      console.log(err)
      res.redirect("/register")
  }


};

const checkVcode = (req, res) => {
    const username = req.params.username
    
    if(!req.session.loggedin && username == req.session.registerinfo.username){
        if(req.body.vcode == req.session.vcode){
            Users.insertOne({email: req.session.email, username: req.session.registeruserinfo.username, fname: req.session.registeruserinfo.fname, lname: req.session.registeruserinfo.lname, imgname: "", password: req.session.registeruserinfo.password, bio: "", GandC: [] }, (err, insertedUser) => {
                if(insertedUser){
                    res.redirect("/login")
                } else {
                    res.redirect("/register")
                }
            })
        }
    }
}

module.exports = {
  userRegister,
  emailSend,
  checkVcode
};

// var vcode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
// req.session.vcode = vcode

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//     user: 'michatweb@gmail.com',
//     pass: 'hayk2006hayko1237775'
//     }
// });

// var mailOptions = {
//     from: 'michatweb@gmail.com',
//     to: registeruser.email,
//     subject: 'Verifying your email address',
//     text: `Hi, ${registeruser.username}\nYour code is: ${req.session.vcode}\nThanks for registering in our website!`
// };

// transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
// res.redirect(`/register/:${registeruser.email}`)




// if (req.session.registeruserinfo.email) {
//     if (req.body.vcode == req.session.vcode) {
//       Users.insertOne(
//         {
//           email: req.session.registeruserinfo.email,
//           username: req.session.registeruserinfo.username,
//           imgname: req.session.registeruserinfo.imgname,
//           password: req.session.registeruserinfo.password,
//           bio: req.session.registeruserinfo,
//         },
//         function (err, insertedUser) {
//           if (insertedUser) {
//             res.redirect("/login");
//           } else {
//             res.redirect("/register");
//           }
//         }
//       );
//     } else {
//       res.redirect("/register");
//     }
//   } else {
//     res.redirect("/");
//   }