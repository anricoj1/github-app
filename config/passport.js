var githubStrategy = require('passport-github').Strategy;
var connection = require('./connect');


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        connection.query("SELECT * FROM User WHERE username = ?",[username], (err, rows) => {
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
            console.log(profile);
            connection.query("SELECT * FROM User WHERE email = ?",[profile.email], (err, rows) => {
                if (err)
                    return done(err);
                if (rows.length) {
                    connection,query("SELECT * FROM User WHERE email = ?",[profile.email], (err, rows) => {
                        return done(null, rows[0]);
                    });
                } else {
                    console.log(profile);
                }
            })
        })
    }));
};


