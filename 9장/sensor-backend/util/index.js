const csvFilePath = '../data/20190802_강동구.csv' 
const csv         = require('csvtojson') 
const path        = require('path')  
const _path       = path.join(__dirname, csvFilePath)  
 
const _form = date => ("00" + date).slice(-2)   
module.exports = () => {
    return {
        async readCSV() {
            //const jsonArray = await csv().fromFile(csvFilePath)
            return await csv().fromFile(_path)
        }, 
        _date(){
            const d = new Date() 
            return `${d.getFullYear()}-${_form(d.getMonth() + 1)}.${_form(d.getDate())} ${_form(d.getHours())}:${_form(d.getMinutes())}:${_form(d.getSeconds())}`
        }
    }
} 