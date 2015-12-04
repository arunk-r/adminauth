'use strict';

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.set('X-Auth-Required', 'true');
    req.session.returnUrl = req.originalUrl;
    res.redirect('/login/');
}

function ensureAdmin(req, res, next) {
    if (req.user.canPlayRoleOf('admin')) {
        return next();
    }
    res.redirect('/');
}

exports = module.exports = function (app, passport) {

    app.get('/', require('./server/index').init);

    //sign up
    app.get('/signup/', require('./server/signup/index').init);
    app.post('/signup/', require('./server/signup/index').signup);

    //login/out
    app.get('/login/', require('./server/login/index').init);
    app.post('/login/', require('./server/login/index').login);

    app.get('/login/forgot/', require('./server/login/forgot/index').init);
    app.post('/login/forgot/', require('./server/login/forgot/index').send);

    app.get('/login/reset/', require('./server/login/reset/index').init);
    app.get('/login/reset/:username/:token/', require('./server/login/reset/index').init);
    app.post('/login/reset/:username/:token/', require('./server/login/reset/index').set);

    app.get('/logout/', require('./server/logout/index').init);

    //admin
    app.all('/admin*', ensureAuthenticated);
    app.all('/admin*', ensureAdmin);
    app.get('/admin/', require('./server/admin/index').init);
};