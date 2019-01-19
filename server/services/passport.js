// passport used to authenticate user when they attempt to visit protected route
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy (for signin)
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(
    localOptions, 
    function(email,password,done){
        //verify email and password
        // if correct, call done with user
        // otherwise call done with false, no user
        console.log('passport local login',email,password)
        User.findOne({email: email}, function(err,user){
            console.log('findone',err,user);
            if (err) { return done(err);}
            if (!user) { return done(null,false); }
            user.comparePassword(password, function(err,isMatch){
                if (err) { return done(err);}
                if (!isMatch) { return done(null,false);}
                return done(null,user);
            });
        })
    }
);

// set up options for jwt strategy
const jwtOptions = {
    // these options specify how to get the payload (used below in jwtLogin callback)
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// create jwt strategy  
//   --- jwtLogin function callback called whenever user needs to be authenticated based on jwt
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // see if user id in payload exists in database
    // if it does, call done() with that user
    // otherwise call done() without a user object
    console.log("****passport login check", payload);
    User.findById(payload.sub, function(err, user) {
        console.log("passport find", err, user);
        if (err) { return done(err, false); }
        if (user) { 
            done(null,user);
        }
        else {
            done(null,false);
        }
    });
});

// tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);