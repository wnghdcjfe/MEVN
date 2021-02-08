const SISE_BASE_URL = 'https://finance.naver.com/item/sise_day.nhn?code=005930'

const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: true
});
const cheerio = require('cheerio')
const main = async () => {
    const resource = await nightmare
        .goto(SISE_BASE_URL).evaluate(() => document.body.innerHTML)
    const $ = cheerio.load(resource)
    const ret = []
    $('tr').each((idx, element) => {
        console.log(idx, element)
        const tds = $(element).find('td')
        const date = $(tds[0]).find('span').eq(0).text().trim()
        if (date.length === 0 || idx == 16) return;
        const value = $(tds[1]).find('span').eq(0).text().trim()
        const increaseOrdecrease = $(tds[2]).find('span').eq(0).text().trim()
        const isInc = $(tds[2]).find('span').eq(0).attr('class').includes("red02")
        ret.push({
            date,
            value,
            increaseOrdecrease,
            isInc
        })
    });
    console.log(ret)
}
main()