const XMLHttpRequest = require('xhr2');

const twitch = {
    check: (oauth) => {
        let result = {success: 0, error: 0, wrong: 0}

        return new Promise((resolve) => {
            oauth.forEach(element => {
                if(element.length != 30) {
                    result.wrong++
                    return;
                }
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://gql.twitch.tv/gql', true);
                xhr.setRequestHeader('Client-ID', `kimne78kx3ncx6brgo4mv6wki5h1ko`)
                xhr.setRequestHeader('Authorization', `OAuth ${element}`)
                xhr.onload = function () {
                    if (xhr.response.includes("token is invalid.")) {
                        result.error++
                    }
                    else {
                        result.success++
                    }
                }
                xhr.send('damn...');
            }); 
            setInterval(() => {
                if(result.success + result.error + result.wrong == oauth.length) {
                    resolve(result)
                }
            }, 100);
        });
    }
}

module.exports = twitch