var request = require('request');
var express = require('express');
var app = express();

var parsebody = function(body){
  return JSON.parse(body);
}

app.get('/getstartimage',function(req,res){
  var url = 'http://news-at.zhihu.com/api/4/start-image/1080*1776';
  request.get(url,function(err,response,body){
    res.jsonp( parsebody(body) );
  })
})

app.get('/getnews',function(req,res){
  var url = 'http://news-at.zhihu.com/api/4/news/latest';
  request.get(url,function(e,r,body){
    res.jsonp( parsebody(body) );
  })
});

app.get('/getnewsbyid',function(req,res){
  var url = 'http://news-at.zhihu.com/api/4/news/'+req.query.id;
  request.get(url,function(a,b,body){
    res.jsonp(JSON.parse(body));
  })
})

app.get('/getnewsbydate',function(req,res){
  var url = 'http://news.at.zhihu.com/api/4/news/before/' + req.query.date;
  request.get(url,function(a,b,body){
    res.jsonp( JSON.parse(body) );
  })
});

app.listen(18080,function(){
  console.log('18080 .......')
})
