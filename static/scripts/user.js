$(document).ready(function() {
    apiGit();


    const apiGit = () => {
        $.getJSON('/api', (data) => {
            console.log(data);
        })
    }
})