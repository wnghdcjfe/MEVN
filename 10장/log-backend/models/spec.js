const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const specSchema = new Schema({ 
    'time' : Date, 
    'cpuUsage' : String, 
    'freemem' : String
})

module.exports = mongoose.model('Spec', specSchema) 
