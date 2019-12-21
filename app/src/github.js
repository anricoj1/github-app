// require sql connection
var configPath = '../../config/';
var connection = require(configPath + 'connect');

// rootPath
var rootPath = '../views/pages/';

// fetch
var fetch = require('node-fetch');


// api.github.com/users/:username
exports.gitUser = (req, res, user) => {
    connection.query("SELECT * FROM User WHERE username = ?",[user], (err, rows) => {
        if (rows.length) {
            getUser(user, res);
        } else {
            res.json({
                git : 0
            });
        }
    });
}


const getUser = (user, res) => {
    fetch('https://api.github.com/users/' + user)
    .then(res => res.json())
    .then(json => res.json(json))
    .catch(err => console.log(err))
}