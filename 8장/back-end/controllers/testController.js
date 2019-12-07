const util = require('../util')()
const request = require('request')
const {PORT} = require('../config')
let cnt = 0; 
exports.sendComment = (req, res, next) =>{
    cnt++;
    const obj = util.comments
    if(cnt % 2 == 0)obj[0].id = 100;
    else obj[0].id = 101;
    return res.status(200).send(obj);
} 
exports.reqPer5 = () =>{ 
    request(`http://127.0.0.1:${PORT}/test`)
}