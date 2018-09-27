const http = require('http');
const cheerio = require('cheerio');
let ladyWorkArr = []  //储存作品
let ladyArr = []    //储存老师
let pageNum = 1
let isLastPage = false
function getInfo() {
  http.get(`http://www.zhucai8.cc/daquanm1p${pageNum}vid.html`,function(res){
    console.log(res)
    let html = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      html += chunk;
    });
    res.on('end', () => {
      // console.log(html);    //这里得到完整的HTML字符串  
      const $ = cheerio.load(html);
      $('.c_txt6').each(function (index,elem){
        if (index == $('.c_txt6').length - 1) {
          console.log($(elem).text()+'#')
          if (pageNum == 27) {
            isLastPage = true
            console.log(ladyWorkArr)
          } else {
            ++pageNum
          }
        }
      })
      $('.detail').each(function (i,ele){
        $(ele).children('a').each(function(b, el){
          let ladyWork = {name:'',dvd:[{idcode:'',score:'',imgsrc:''}]}
          let imgsrc = $('.cover')[i].attribs.src
          let idcode = $('.name a')[i].attribs.title
          let score = $($('.film_score')[i]).children('strong').text()
          let name = $(el).text()
          if (!imgsrc) {
            imgsrc = $('.cover')[i].attribs.lz_src
          }
          imgsrc = `http://${imgsrc.split('//')[1]}`
          // console.log(i+$(el).text()+'---'+imgsrc+'---'+idcode+'---'+score)
          if (ladyArr.indexOf(name) == -1) {
            ladyWork.name = name
            ladyWork.dvd[0].idcode = idcode
            ladyWork.dvd[0].score = score
            ladyWork.dvd[0].imgsrc = imgsrc
            ladyWorkArr.push(ladyWork)
            console.log(ladyWorkArr)
            ladyArr.push(name)
          } else {
            console.log(name)
            let ladyIndex = (ladyArr).indexOf(name)
            console.log('ladyIndex========'+ladyIndex)
            let obj = {idcode,score,imgsrc}
            console.log(ladyWorkArr[ladyIndex])
            ladyWorkArr[ladyIndex].dvd.push(obj)
            console.log(ladyArr[0]+'---'+ladyWork.name)
          }
        })
      })
      if (!isLastPage) {
        getInfo()
      } else {
        console.log(JSON.stringify(ladyWorkArr))
        const MongoClient = require('mongodb').MongoClient ;   
        const url='mongodb://localhost:27017'
        const dbName = "lady";
        MongoClient.connect(url, function(err, client) {
          const db = client.db(dbName)
          const collection = db.collection('beautyLady');
          // 插入许多
          collection.insertMany(ladyWorkArr,function (err, res) {
            console.log(err)
            console.log(res)
          })
          // assert 断言，
        });
      }
    });
  })
}
getInfo()