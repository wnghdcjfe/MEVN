const util = require('../util')()
const request = require('request')
const {PORT} = require('../config')
const {wrapE} = require('../util/index')()  
const ErrorLog = require('../models/ErrorLog')

let cnt = 0 
exports.sendComment = (req, res, next) =>{
    cnt = (cnt + 1) % 2
    const obj = util.comments
    if(cnt % 2 == 0)obj[0].id = 100
    else obj[0].id = 101
    return res.status(200).send(obj)
} 
let cnt2 = 0
exports.testing = wrapE(async (req, res, next) =>{
    cnt2 = (cnt2 + 1) % 5
    const successObj = {
        "올바른" : "데이타"
    } 
    if(cnt2 % 5 == 0){
        return res.status(200).send(successObj)
    }else if(cnt2 % 5 == 1){
        return res.status(204).send(successObj) 
    }else if(cnt2 % 5 == 2){ 
        return res.status(401).send({ message: `잘못된 비밀번호를 입력하셨습니다.`})    
    }else if(cnt2 % 5 == 3){ 
        JSON.parse('{"와우}')
        return res.status(200).send(successObj)
    } else if(cnt2 % 5 == 4){  
        const ret = await ErrorLog.findById(1) 
        return res.status(200).send(successObj)
    }  
})
exports.reqPer5 = () =>{ 
    request(`http://127.0.0.1:${PORT}/test`)
}