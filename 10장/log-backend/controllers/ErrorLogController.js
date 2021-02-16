const ErrorLog = require('../models/ErrorLog.js')  

exports.save = (json)=>{
    const new_log = new ErrorLog(json)
    return new_log.save() 
}   