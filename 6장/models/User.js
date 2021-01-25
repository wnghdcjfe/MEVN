const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const userSchema = new Schema({
    name: String,
    password : String, 
    items : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item"
        }
    ]  
})

module.exports = mongoose.model('User', userSchema) 
