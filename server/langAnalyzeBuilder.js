var region="";
var subscriptionKey="";
var language = "";
var body = {
    documents: []
};

module.exports = {
    region : region,
    subscriptionKey : subscriptionKey,
    language : language,
    url : "https://api.cognitive.microsoft.com/text/analytics/v2.0/sentiment",
    method : 'POST',
    body : body,
    setUrl: function(){
        this.url = "https://"+this.region+".api.cognitive.microsoft.com/text/analytics/v2.0/sentiment"
        console.log("Sending request "+this.url);
    }
};