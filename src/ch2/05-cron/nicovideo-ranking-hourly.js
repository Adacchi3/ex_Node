var RSS = "http://www.nicovideo.jp/ranking/fav/hourly/all?rss=2.0&lang=ja-jp";

var request = require('request');
var fs = require('fs');
var parseString = require('xml2js').parseString;
var xml2js = require('xml2js');
var builder = new xml2js.Builder();

request(RSS, function(err, response, body){
    if(err||response.statusCode!=200){
        console.log("Error", err); return;
    }
    var t = new Date();
    var savedir = __dirname +"/"+ t.getFullYear()+(t.getMonth()+1)+t.getDay();
    if(!fs.existsSync(savedir)){
        fs.mkdirSync(savedir);
    }
    var fname = "nicovideo_ranking_"+t.getFullYear()+(t.getMonth()+1)+t.getDay()+"-"+t.getHours()+".xml";
    fname = savedir + "/" + fname;
    fs.writeFile(fname, body);
});