const Spec = require('../models/spec.js')  
const os = require('os-utils')  
const setFloor = a => ~~(a * 10000) / 100
const getcpuUsage = () =>{
    return new Promise((resolve, reject) =>{
        os.cpuUsage(function(usagePercent){
            resolve(setFloor(usagePercent))
        })
    })
} 

exports.getSpec = async() =>{
    const obj = {
        "time" : new Date(), 
        "cpuUsage" : await getcpuUsage(), 
        "memUsage" : setFloor(1 - os.freememPercentage())
    }
    return obj 
} 
exports.save = (json)=>{
    const new_spec = new Spec(json)
    return new_spec.save() 
}  

