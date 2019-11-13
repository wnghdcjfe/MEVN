const Log = require('../models/log.js');  

exports.save = (json)=>{
    const new_log = new Log(json)
    return new_log.save(); 
}  

const setFloor = a => ~~(a * 10000) / 100;
exports.getLogLatestAvg = async () =>{
    const a = await Log.aggregate(
        [
            {$sort : {time : -1}}, 
            {$limit :100},   
            {
                $group:
                  { 
                      _id: "$url", 
                    avgResTime: { $avg: "$response-time" }
                  }
            }
        ]
    )  
    console.log(a)
    const ret = {
        ...a[0], 
        time : new Date(), 
        avgResTime : setFloor(a[0].avgResTime),  
    }  
    console.log(ret)
    return ret;
} 
