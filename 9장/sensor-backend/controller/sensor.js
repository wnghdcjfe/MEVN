const Sensor = require('../models/sensor.js')
 
const save = async(data)=> {
    const ret = await Sensor.findOneAndUpdate({
        "idx" : {
            $eq : data.idx
        }}, {
            $set : data
        }, {
            upsert: true, 
            multi: true, 
            new : true, 
            setDefaultsOnInsert: true
        }
    ).lean() 
    return ret  
} 
exports.sendDataAndSaveDB = (io, jsonArray, idx) =>{
    return new Promise((resolve, reject) =>{   
        const data = jsonArray[idx] 
        io.emit("sensor", data) 
        save(data) 
        resolve(idx)
    })  
} 
