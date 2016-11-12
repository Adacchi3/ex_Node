//モジュールの読み込み
var client = require('cheerio-httpcli');
var request = require("request");
var fs = require('fs');
var URL = require('url');

//ダウンロード先のディレクトリの作成
var savedir = __dirname + "/twittericon";
if(!fs.existsSync(savedir)){
    fs.mkdirSync(savedir);
}

//HTMLファイルの指定
var url = "http://www.tbs.co.jp/anime/gn/special/present01.html";
var param = {};
//HTMLファイルの取得
client.fetch(url, param, function(err, $, res){
    if(err){ console.log("error"); reutrn; }
    //リンクを抽出して表示
    $("img").each(function(idx){
        var src = $(this).attr('src');
        src = URL.resolve(url, src);
        var fname = $(this).attr('src');
        fname = URL.resolve(url, "../../../../"+fname);
        fname = URL.parse(fname).pathname;
        var re = /^.*twittericon.*$/;
        if(re.test(fname)){
            fname = savedir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');
            request(src).pipe(fs.createWriteStream(fname));
        }
    });
});