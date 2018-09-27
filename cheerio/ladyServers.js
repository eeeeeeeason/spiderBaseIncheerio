var Mock = require('mockjs')
var express =require('express')
var app = express()
const MongoClient = require('mongodb').MongoClient ;   
const url='mongodb://localhost:27017'
const dbName = "lady";

app.get('/getLadyInfo/', function (req, res) {
  console.log(req)
  let pageNum = req.query.pageNum
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName)
    const collection = db.collection('beautyLady');
    collection.find({}).skip((pageNum-1)*30).limit(30).toArray(function (err, docs) {
      // console.log(docs)
      res.send(JSON.stringify(docs));
    })
  });
  // res.send(JSON.stringify({name, age, mobile, gender, address}));
})

var server = app.listen(8081, function () {

 var host = server.address().address
 var port = server.address().port

 console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
