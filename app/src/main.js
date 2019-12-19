// require sql connection
var configPath = '../../config/';
var connection = require(configPath + 'connect');

// rootPath
var rootPath = '../views/pages/';


// index route
exports.index = (req, res) => {
    res.render(rootPath + 'index.ejs', {user : req.user});
}

// session profile
exports.userProfile = (req, res) => {
    res.render(rootPath + 'profile.ejs', {user : req.user});
}


// parameter profile
exports.paramProfile = (req, res) => {
    res.render(rootPath + 'profile.ejs', {user : req.user})
}

// logout 
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
