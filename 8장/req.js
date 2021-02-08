const axios = require('axios')
const cheerio = require('cheerio')   
const BASE_URL = 'https://finance.naver.com/item/sise_day.nhn?code=' 
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
        const ret = []
        $('tr').each((idx, element) => { 
            const tds = $(element).find('td')   
            const date = $(tds[0]).find('span').eq(0).text().trim()
            if(date.length === 0 || idx == 16)return;   
            const value = $(tds[1]).find('span').eq(0).text().trim()  
            const increaseOrdecrease = $(tds[2]).find('span').eq(0).text().trim()
            const isInc = $(tds[2]).find('span').eq(0).attr('class').includes("red02") 
            ret.push({
                date, value, increaseOrdecrease, isInc
            }) 
        });  
        resolve({
            [name] : ret
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
