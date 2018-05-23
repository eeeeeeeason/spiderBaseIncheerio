const http = require('http');
const cheerio = require('cheerio');
let ladyArr = []
http.get('http://www.zhucai8.cc/daquanm1p1vid.html',function(res){
  console.log(res)
  let html = '';
  res.setEncoding('utf8');
    res.on('data', (chunk) => {
      html += chunk;
    });
    res.on('end', () => {
        console.log(html);    //这里得到完整的HTML字符串  
        const $ = cheerio.load(html);
        $('.detail').each(function (i,ele){
          $(ele).children('a').each(function(b, el){
            let lady = {name:'',dvd:[{idCode:'',score:'',imgsrc:''}]}
            let imgsrc = $('.cover')[i].attribs.src
            let idcode = $('.name a')[i].attribs.title
            let score = $($('.film_score')[i]).children('strong').text()
            if (!imgsrc) {
              imgsrc = $('.cover')[i].attribs.lz_src
            }
            imgsrc = `http://${imgsrc.split('//')[1]}`
            console.log(i+$(el).text()+'---'+imgsrc+'---'+idcode+'---'+score)
            lady.name = $(el).text()
            lady.dvd[0].idCode = idcode
            lady.dvd[0].score = score
            lady.dvd[0].imgsrc = imgsrc
            ladyArr.push(lady)
          })
        })
        // $('.cover').each(function(index,el){
          // console.log('xxxxxxxxxxx')
          // console.log($(el)[0].attribs.lz_src)
          // console.log(index+'---'+$(el).attr('src'))
        // })
        console.log($('.detail a').length)
        console.log(ladyArr)
    });
})