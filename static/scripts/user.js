$(document).ready(function() {
    sessionGit();

    function sessionGit() {
        $.getJSON('/api', (data) => {
            userAssets(data);
            user = new GitHub(data.login, data.repos_url);
            user.reposUrl();
        });
    }

    class GitHub {
        constructor(name, repos_url) {
            this.name = name;
            this.repos_url = repos_url;
        }

        reposUrl() {
            $.getJSON(this.repos_url, (repos) => {
                repos.forEach(writeBrief);
            });
        }
    }

    function writeBrief(item, index) {
        
    }

});