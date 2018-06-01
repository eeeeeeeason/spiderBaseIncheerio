var Mock = require('mockjs')
var express =require('express')
var app = express()
const MongoClient = require('mongodb').MongoClient ;   
const url='mongodb://localhost:27017'
const dbName = "blogData";

// 获取标题列表
app.get('/api/getArticleLabel', function (req, res) {
  console.log(req.query)
  let pageNum = req.query.pageNum
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName)
    const collection = db.collection('blogData');
    collection.find({}).toArray(function (err, docs) {
      // console.log(docs)
      let tagList = {tagList:docs}
      res.send(JSON.stringify(tagList));
    })
  });
  // res.send(JSON.stringify({name, age, mobile, gender, address}));
})
// 获取标题列表
app.get('/api/getArticleList', function (req, res) {
  console.log(req.query)
  let title = req.query.title
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName)
    const collection = db.collection('blogData');
    collection.find({'tagName':title}).toArray(function (err, docs) {
      console.log(docs[0].Artical)
      let Article = {Article:docs[0].Artical}
      res.send(JSON.stringify(Article));
    })
  });
  // res.send(JSON.stringify({name, age, mobile, gender, address}));
})


var server = app.listen(3080, function () {

 var host = server.address().address
 var port = server.address().port

 console.log("应用实例，访问地址为 http://%s:%s", host, port)

})