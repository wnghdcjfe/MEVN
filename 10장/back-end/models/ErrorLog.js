const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const ErrorlogSchema = new Schema({ 
    'time' : Date, 
    'message' : String,  
    'error' : String, 
    'code' : Number
})

module.exports = mongoose.model('ErrorLog', ErrorlogSchema) 
