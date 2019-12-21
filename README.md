# Github Mobile Web App


# Description 
Since Github Doesnt Have a Mobile Application I am making a
Web Application That is aiming to be a Responsive Web App for 
most common devices (Phones, Tablets).


# Tools 
- Nodejs
- Express
- Passport-Github (Login)
- Web-Push
- Focusing On ES6 Syntax (arrow functions)

# Service Worker
- Use Web Push To Send Useful Notifications!

# Goal
- Research More for oAuth Privileges
- Show All Repo Details
    - All Languages
    - Files
    - README's
    - Events (Push, Pull, Create)

# .env Variables
process env variables keep essential information hidden like keys and passwords
you can use them by:
- making a {.env} file in your {root directory}.
- in that file declare variables:
    - port=8080
    - npm install dotenv 
    - require dotenv in server
    - access variable:
        - process.env.port


# Passport Tip
When deserializing a user (logging out) <br />
if you have any routes that start with a parameter at the begging
you may run into issues<br />
Ex: <br />
<br />
app.get(/:username, (req, res) => {
    res...etc
}); 
<br />
<br />
Assuming your logout route looks something like one of these <br />
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err;
        } else {
            req.logout();
            res.redirect('/');
        }
    });
});
<br />
<br />
Or: <br />
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
<br />
upon logout you for some reson may be redirected to /:username and not destroying the session; opposed to being redirected to /. Im assuming if your redirect url is your root directory it may cause this issue.  