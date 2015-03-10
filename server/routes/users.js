var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User     = require('../models/User');
var bcrypt   = require('bcryptjs');
var moment   = require('moment');
var jwt      = require('jwt-simple');
var config   = require('config');

// POST /auth/login
router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username }, '+password', function(err, user) {
        if (!user) {
            return res.status(401).send({ message: { username: 'Incorrect username' } });
        }

        bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (!isMatch) {
                    return res.status(401).send({ message: { password: 'Incorrect password' } });
                }

                user = user.toObject();
                delete user.password;

                var token = createToken(user);
                res.send({ token: token, user: user });
        });
    });
});

// POST /auth/signup
router.post('/auth/signup', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, existingEmail) {
        if (existingEmail) {
            return res.status(409).send({ message: 'Email is already taken.' });
        }

        User.findOne({ username: req.body.username }, function(err, existingUser) {
            if (existingUser) {
                return res.status(409).send({ message: 'Email is already taken.' });
            }

            var user = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });

            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(user.password, salt, function(err, hash) {
                    user.password = hash;

                    user.save(function() {
                        var token = createToken(user);
                        res.send({ token: token, user: user });
                    });
                });
            });
        });
    });
});

module.exports = router;




function createToken(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user._id
    };

    return jwt.encode(payload, config.tokenSecret);
}
