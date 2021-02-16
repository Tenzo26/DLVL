const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbErrorHandler');


exports.signup = (req, res) => {
    const user = new User(req.body);
    //console.log("req.body",req.body);
    user.save((err,user) => {
        if (err) {
            return res.status(400).json({
               error: err.message
            });
        }

        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });

    });
};


exports.signin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email},(err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            }, process.env.JWT_SECRET
        );
        
        res.cookie('t',token,{expire: new Date() + 9999});
        const {_id, name, email, role} = user
        return res.json({token, user: {_id,email,name,role}});



    }); 
};


exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({message: 'Signout Success'});
};


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
  });

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
        if (!user) {
            return res.status(403).json({
                error: "Access Denied"
            });
        }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin Only. Access Denied"
        });
    }
    next();
};