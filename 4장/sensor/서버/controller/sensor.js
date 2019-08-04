const Sensor = require('../models/sensor.js');
exports.save = async(data)=> {
    const ret = await Sensor.findOneAndUpdate().lean()
    return ret;  
}; 