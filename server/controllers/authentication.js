const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    // using user.id (vs email) so token ok even if email changes
    // sub key is convention, stands for subject
    // iat key is convention, stands for issued at time
    return jwt.encode({ sub: user.id, iat: timestamp},config.secret);
}

exports.signin = function (req, res, next) {
    // user has already been auth'd (see router.js => passport.js)
    // we just need to give them a token
    console.log("****Server signin", req);
    res.send ({token: tokenForUser(req.user)});
};


exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({error: 'You must provide email and password'});
    }
    // see if user with given email already exists
    User.findOne({email: email}, function(err, existingUser) {
        if (err) {return next(err);}  // general error

        // if user email does exist, return an error
        if (existingUser) {
            // .status() sets http response code to 422
            return res.status(422).send({error: 'Email is in use'}); 
        }

        // if user email doesn't exist, create & save user record
        const user = new User({ email:email, password:password});
        user.save(function(err){
            if (err) {return next(err);}
            // Respond to request saying user was created
            res.json({token: tokenForUser(user)});               
        }); 
    });


};