module.exports = function(app, passport) {
    var main = require('./src/main');

    // index route 
    app.get('/', (req, res) => {
        return main.index(req, res);
    });

    // session profile
    app.get('/profile', isLoggedIn, (req, res) => {
        return main.userProfile(req, res);
    });

    // parameter profile
    app.get('/:username', isLoggedIn, (req, res) => {
        return main.paramProfile(req, res);
    });

    // login with github
    app.get('/auth/github', passport.authenticate('github', {scope : ['profile', 'id']}));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// if session or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
}