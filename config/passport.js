var githubStrategy = require('passport-github').Strategy;
var connection = require('./connect');


module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        connection.query("SELECT * FROM User WHERE username = ?",[username], function(err, rows) {
            done(err, rows[0]);
        });
    });



    passport.use(new githubStrategy({
        clientID : process.env.GIT_CLIENT,
        clientSecret : process.env.GIT_SECRET,
        callbackURL : process.env.GIT_CALLBACK
    },
    (accessToken, refreshToken, profile, cb) => {
        process.nextTick(() => {
            connection.query("SELECT * FROM User WHERE id = ?",[profile.id], (err, rows) => {
                if (err)
                    return cb(err);
                if (rows.length) {
                    connection.query("SELECT * FROM User WHERE id = ?",[profile.id], (err, rows) => {
                        return cb(null, rows[0]);
                    });
                } else {
                    var newUser = {
                        'id' : profile.id,
                        'username' : profile.username,
                        'name' : profile.displayName,
                        'avi' : profile._json.avatar_url,
                        'repos' : profile._json.repos_url
                    };

                    connection.query("INSERT INTO User (id, username, name, avi, repos) VALUES(?,?,?,?,?)",[newUser.id, newUser.username, newUser.name, newUser.avi, newUser.repos], (err, rows) => {
                        newUser.id = rows.insertId;

                        return cb(null, newUser);
                    });
                }
            });
        });
    }));
};


