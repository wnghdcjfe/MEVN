const Spec = require('../models/spec.js');  
const os = require('os-utils');  
const getcpuUsage = () =>{
    return new Promise((resolve, reject) =>{
        os.cpuUsage(function(usagePercent){
            resolve(usagePercent);
        });
    })
} 

exports.getSpec = async() =>{
    const obj = {
        "time" : new Date(), 
        "cpuUsage" : await getcpuUsage(), 
        "freemem" : os.freememPercentage()
    }
    return obj; 
} 
exports.save = (json)=>{
    const new_spec = new Spec(json)
    return new_spec.save(); 
}  

