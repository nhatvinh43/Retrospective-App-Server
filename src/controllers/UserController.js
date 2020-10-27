const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = function (req, res, next)
{    
    User.findOne({email: req.body.email}, (err, user) => {
        if(user == null)
        { 
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if (err) {return next(err);}
                const user = new User(req.body)
                user.password = hash;
                user.save((err, result) => {
                    if(err) {return res.json({err})}
                    res.json({user: result})
                })
            })
        }else{
            res.json({err: 'Email has been used'})
        }
    })
}

exports.login = function(req, res){
    User.findOne({email: req.body.email}).exec(function(err, user){
        if(err) {
            return res.json({err})
        }else if (!user){
            return res.json({err: 'Username and Password are incorrect'})
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(result === true){
                req.session.user = user
                res.json({
                    user: user,
                    "login": "success"
                })
            }else{
                return res.json({err: 'Username and Password are incorrect'})
            }
        })
    })
}

exports.logout = function(req, res){
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return res.json({err});
            } else {
                return res.json({'logout': "Success"});
            }
        });
    }
}