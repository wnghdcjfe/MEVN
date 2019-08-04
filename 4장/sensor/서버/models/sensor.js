const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const sensorSchema = new Schema({
	cnt: Number,
	id: String,
    time: Date, 
    temp: Number, 
    wv: Number, 
    humi : Number
});

module.exports = mongoose.model('Sensor', sensorSchema); 