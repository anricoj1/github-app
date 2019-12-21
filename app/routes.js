module.exports = function(app, passport) {
    var main = require('./src/main');
    var github = require('./src/github');

    // index route 
    app.get('/', (req, res) => {
        return main.index(req, res);
    });

    // login with github
    app.get('/auth/github', passport.authenticate('github', {scope : ['profile', 'id']}));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

    // session profile
    app.get('/profile', isLoggedIn, (req, res) => {
        return main.userProfile(req, res);
    });

    // parameter profile
    app.get('/user/:username', isLoggedIn, (req, res) => {
        return main.paramProfile(req, res);
    });

    // api.github.com/user/
    app.get('/api', isLoggedIn, (req, res) => {
        return github.gitUser(req, res, req.user.username);
    })

    // logout
    app.get('/logout', (req, res) => {
        return main.logout(req, res);
    });
};

// if session or not
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
}