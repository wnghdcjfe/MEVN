const Log = require('../models/log.js');  

exports.save = (json)=>{
    const new_log = new Log(json)
    return new_log.save(); 
}  

const setFloor = a => ~~(a * 10000) / 100;
exports.getLogLatestAvg = async () =>{
    const a = await Log.aggregate(
        [
            {$match : {}},
            {$limit :100},   
            {
                $group:
                  {
                    _id: "$remote-address", 
                    avgResTime: { $avg: "$response-time" }
                  }
            }
        ]
    )  
    const ret = {
        ...a[0], 
        time : new Date(), 
        avgResTime : `${setFloor(a[0].avgResTime)}`,  
    } 
    return ret;
} 
