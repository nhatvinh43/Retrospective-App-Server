const User = require('./models/User')
const bcrypt = require('bcrypt')

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport'),
    localStrategy = require('passport-local'),
    JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
}, async (req, username, password, done) =>
    {
        try
        {
            const user = await User.findOne({ username: username });
        
            if (user)
            {
                return done(null, false, { message: "Username is already taken" });
            }
            else
            {
                bcrypt.hash(password, BCRYPT_SALT_ROUNDS , function(err, hash){
                    if (err) {return done(err);}
                    const user = new User(req.body);
                    user.password = hash;

                    user.save((err, result) => {
                        if(err) {return done(err)}
                        return done(null, user);
                    })
                })
            }
        }
        catch (err)
        {
            return done(err);
        }
        
    }
))

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}, async (username, password, done) =>
    {
        try
        {
            const user = await User.findOne({ username: username });

            if (!user)
            {
                return done(null, false, { message: "User does not exist" });
            }
            else
            {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result === true){
                        return done(null, user);
                    }else{
                        return done(null, false, { message: "Incorrect password" });
                    }
                })
            }
        }
        catch (err)
        {
            return done(err);
        }
}
))

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET,
}

passport.use('jwt', new JWTStrategy(opts, async (jwt_payload, done) =>
{
    try
    {
        const user = await User.findOne({ _id: jwt_payload._id });
        
        if (user)
        {
            done(null, user);
        }
        else
        {
            done(null, false, { message: "User not found" });
        }
    }
    catch (err)
    {
        done(err);
    }
    
}
))
