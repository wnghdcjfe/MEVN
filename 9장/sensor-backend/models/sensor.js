const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const sensorSchema = new Schema({ 
	id: Number,
	idx: Number,
    time: Date, 
    temp: Number, 
    wv: Number, 
    humi : Number
})
module.exports = mongoose.model('Sensor', sensorSchema) 
