const axios = require('axios')
const cheerio = require('cheerio')    
const BASE_URL = 'https://finance.naver.com/item/main.nhn?code=' 
const companyList = [
    {name : "삼성전자", code : "005930"},
    {name : "네이버", code : "035420"},
    {name : "현대모비스", code : "012330"},
    {name : "카카오", code : "035720"}, 
] 

const req = (url, name) => {
  return new Promise((resolve, reject) => {
    axios.get(url) 
      .then((res) => {   
        const $ = cheerio.load(res.data)  
        const data = $('.no_today').eq(0).text().trim().split('\n')[0]; 
        const numData = ~~data.split(',')[0] * 1000 + ~~data.split(',')[1]
        resolve({
            [name] : numData
        })
      })
      .catch(e => resolve(null))
  });
} 

const main = async () => { 
    const urlList = companyList.map(e => req(BASE_URL + e.code, e.name))
    const ret = await Promise.all(urlList) 
    let obj = {}
    ret.forEach(e => {
        obj = {...e, ...obj}
    }) 
    console.log(ret)
}
main();
