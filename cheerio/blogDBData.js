const MongoClient = require('mongodb').MongoClient ;   
const url='mongodb://localhost:27017'
const dbName = "blogData";
MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName)
  const collection = db.collection('blogData');
  // 插入许多
  let tagList = [{tagName: "最近学习", tagNumber: 0, Artical: [{date: "2018-06-01", introduce: "总结mpvue踩坑日记",label:["vue"],state:"publish",tag:"vue",title:"mpvue中的巨坑了解一下",user:[{avatar_url:"https://wx.qlogo.cn/mmopen/vi_32/icSp9XzP7vvNU8TyuKR25PJeicuFBY1ydqfdCicqsiafkTUXTfO3rM220grkvvu1wlukPVIpU2rPRJcCjzianlwiaBfw/132",html_url:"https://github.com/eeeeeeeason",name:"eason"}]},{date: "2018-06-01", introduce: "blog搭建",label:["node"],state:"publish",tag:"node",title:"blog搭建历程",user:[{avatar_url:"https://wx.qlogo.cn/mmopen/vi_32/icSp9XzP7vvNU8TyuKR25PJeicuFBY1ydqfdCicqsiafkTUXTfO3rM220grkvvu1wlukPVIpU2rPRJcCjzianlwiaBfw/132",html_url:"https://github.com/eeeeeeeason",name:"eason"}]}]}, {tagName: "node", tagNumber: 0}, {tagName: "mongodb", tagNumber: 0}, {tagName: "协议", tagNumber: 0}, {tagName: "vue", tagNumber: 0}]
  collection.insertMany(tagList,function (err, res) {
    console.log(err)
    console.log(res)
  })
  // assert 断言，
});