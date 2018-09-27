var Mock = require('mockjs')
var express =require('express')
var app = express()
var testTemp = []
var begintime = new Date()
console.log(begintime)
for (var i = 0; i<100000; i++) {
  function createRandom (min, max) {
    return min + Math.ceil((max - min)*Math.random())
  };
  var name = Mock.Random.last() // 随机名称
  var age = createRandom(1,100)
  var mobile = 10000000000 + createRandom(1,9999999999)
  var gender = Math.round(createRandom(0,1))
  var address = Mock.Random.county(true)
  testTemp.push({name, age, mobile, gender, address})
}
// app.get('/getRandomUserInfo', function (req, res) {
//   res.send(JSON.stringify({name, age, mobile, gender, address}));
// })

// var server = app.listen(8081, function () {

//  var host = server.address().address
//  var port = server.address().port

//  console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })
const MongoClient = require('mongodb').MongoClient ;   
const url='mongodb://localhost:27017'
const dbName = "company";
MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName)
  const collection = db.collection('workmate');
  collection.insertMany(testTemp,function (err, res) {
    if (err) {
      console.log(err)
    }
    console.log(res)
    console.log('开始时间')
    console.log(begintime)
    console.log('结束时间')
    console.log(new Date())
    })
    
  // assert 断言，
  console.log("Connected successfully to server");
});