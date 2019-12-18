module.exports = function(app, passport) {
    const rootPath = '../views/pages/';

    // index route 
    app.get('/', (req, res) => {
        res.render(rootPath + 'index.ejs', {user : req.user});
    });

    // session profile
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render(rootPath + 'user/profile.ejs', {user : req.user});
    });

    app.get('/:username', isLoggedIn, (req, res) => {
        res.render(rootPath + 'account/profile.ejs', {user : req.user})
    });

    // login with github
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));
}

// if session or not
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}