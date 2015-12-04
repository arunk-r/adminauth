'use strict';

exports.init = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect(req.user.defaultReturnUrl());
    } else {
        res.render('login/forgot/index');
    }
};

exports.send = function (req, res, next) {
    console.log('inside send')
    var workflow = req.app.utility.workflow(req, res);

    workflow.on('validate', function () {
        console.log('Inside validate')
        console.log(req.body)
        console.log('after body')
        if (!req.body.username) {
            workflow.outcome.errfor.username = 'required';
            return workflow.emit('response');
        }

        workflow.emit('generateToken');
    });

    workflow.on('generateToken', function () {
        var crypto = require('crypto');
        crypto.randomBytes(21, function (err, buf) {
            if (err) {
                return next(err);
            }

            var token = buf.toString('hex');
            req.app.db.models.User.encryptPassword(token, function (err, hash) {
                if (err) {
                    return next(err);
                }

                workflow.emit('patchUser', token, hash);
            });
        });
    });

    workflow.on('patchUser', function (token, hash) {
        var conditions = {username: req.body.username.toLowerCase()};
        var fieldsToSet = {
            resetPasswordToken: hash,
            resetPasswordExpires: Date.now() + 10000000
        };
        req.app.db.models.User.findOneAndUpdate(conditions, fieldsToSet, function (err, user) {
            if (err) {
                return workflow.emit('exception', err);
            }

            if (!user) {
                return workflow.emit('response');
            }

            workflow.emit('sendEmail', token, user);
        });
    });

    workflow.on('sendEmail', function (token, user) {
        console.log(req.protocol + '://' + req.headers.host + '/login/reset/' + user.username + '/' + token + '/');
        workflow.emit('response');
    });

    workflow.emit('validate');
};
