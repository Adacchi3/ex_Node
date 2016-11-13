var RSS = "http://www.nicovideo.jp/ranking/fav/hourly/all?rss=2.0&lang=ja-jp";

var xml2js = require('xml2js');
var parseString = require('xml2js').parseString;
var request = require('request');
var URL = require('url');

var builder = new xml2js.Builder();

request(RSS, function(err, response, body){
    if(!err&&response.statusCode==200){
        analyzeRSS(body);
    }else{
        console.log(err);
    }
});

function analyzeRSS(xml){
    parseString(xml, function(err, obj){
        if(err){ console.log(err); return; }
        //console.log(builder.buildObject(JSON.stringify(obj)));
        var items = obj.rss.channel[0].item;
        for(var i in items){
            var item = items[i];
            //console.log(JSON.stringify(item));
            console.log(item.title[0]);
            console.log("-- "+item.link[0]);
            console.log("   "+item.pubDate[0]);
        }
    });
}