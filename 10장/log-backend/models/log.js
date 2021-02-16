const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const logSchema = new Schema({
    'remote-address' : String, 
    'time' : Date, 
    'method' : String, 
    'url' : String, 
    'content-length' : Number,  
    'response-time' : Number
})

module.exports = mongoose.model('Log', logSchema) 
