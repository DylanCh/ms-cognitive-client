var langAnalyze = require('../langAnalyzeBuilder');
const axios = require('axios');

// Example 2: building a request
module.exports = function(app) {
    var router = app.loopback.Router();
    
    router.route('/langAnalyze1')
    .get(function(req,res){
        res.send('Cannot GET /langAnalyze1. Please make a POST request');
        res.end();
    })
    .post(function(req,res){
        langAnalyze.language = 'en';
        langAnalyze.body.documents = [{
            "language": langAnalyze.language,
            "id": "1",
            "text": "Hello world"
            },
            {
            "language": langAnalyze.language,
            "id": "2",
            "text": "and hello kitty"
            }];
        langAnalyze.region = 'westus';
        langAnalyze.subscriptionKey = '[your key]';
        langAnalyze.setUrl();

        console.log(langAnalyze.body);

        axios(
            {
                url: langAnalyze.url, 
                data: JSON.stringify(langAnalyze.body),
                method: 'post',
                headers :{
                    "accept": "application/json",
                    "content-type" : "application/json",
                    "ocp-apim-subscription-key": langAnalyze.subscriptionKey
                }
            }
        )
        .then(function (response){
            res.send(response);
        })
        .catch(function(error){
            res.send(error);
        });
    });
    app.use(router);
};