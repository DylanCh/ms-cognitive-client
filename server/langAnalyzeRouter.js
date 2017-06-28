'use strict';
/**
 * request to this route:
 *  {
 *      region : String,
 *      language : String,
 *      documents : [  
 *          {text : String}
 *          {text : String}
 *          ...
 *      ]
 *      subscriptionKey : String
 *  }
 */

/**
 * Example:
 * {
       "region" : "westus",
       "language" : "en",
       "documents" : [  
           {"text" : "How are you today?"},
           {"text" : "I am good, thank you."}
       ],
       "subscriptionKey" : "Your key"
 }
 * 
 */




module.exports.langAnalyze = function(request,response){
    var unirest = require("unirest");
    
    //console.log(request.body);

    if (request.body['documents'].length>100){
        response.send('Cannot send more than 100 documents');
    }

    let region = request.body['region'];

    let subscriptionKey = request.body['subscriptionKey'];

    var url = "https://"+region+".api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

    console.log("Sending request to "+url);

    var req = unirest("POST", url);

    req.headers({
        "content-type": "application/json",
        "accept" : "application/json",
        "ocp-apim-subscription-key": subscriptionKey
    });

    let language = request.body['language'];

    var body = {
        documents: []
    };

    for (var i=0; i < request.body['documents'].length; i++){
        body.documents.push({
            "language":language,
            "id": (i+1).toString(),
            "text": request.body['documents'][i].text
        });
    }

    console.log(JSON.stringify(body,null,2));

    // req.headers['Content-Type'] = 'application/json';
    // req.headers['Accept']  = "application/json";
    // req.headers['ocp-apim-subscription-key'] = 'subscriptionKey';

    req.send(
        body
    );

    req.end(function (res) {
        if (res.error) {
            throw new Error(res.error);
        }
        console.log(res.body);
        response.send(res.body);
    });
};

