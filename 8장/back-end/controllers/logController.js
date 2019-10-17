const Log = require('../models/log.js');  

exports.save = (json)=>{
    const new_log = new Log(json)
    return new_log.save(); 
}  

