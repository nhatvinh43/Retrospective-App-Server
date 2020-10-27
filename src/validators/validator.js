const User = require('../models/User')
const {check, validationResult} = require('express-validator')

exports.UserValidator =[
    //name
    (req, res, next) => {
        check('email', 'Invalid email.').isEmail();
        check('email', 'Email is required.').not().isEmpty();
        check('username', 'Username is required.').not().isEmpty();
        check('username', 'Username must be more than 3 characters').isLength({ min: 3 });
        check('password', 'Password is required.').not().isEmpty();
        check('password', 'Password must be more than 6 characters').isLength({ min: 6 });
        check('password_confirm', 'Password confirm is required.').not().isEmpty();
        check('password_confirm', 'Password mismatch').equals(req.body.password);

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ error: errors.array() });
                
        }
        next();
    }

]

exports.requiresLogout = (req, res, next)=>{
    if (req.session && req.session.user) {
        return res.json({err: 'You must logout first!'});        
    } else {
        next();
    }
}

exports.requiresLogin = (req, res, next)=>{
    if (req.session && req.session.user) {
        next();      
    } else {
        return res.json({err: 'You must login first!'});  
    }
}

exports.postValidator = [
    (req, res, next) =>
    {
        
    }
]
