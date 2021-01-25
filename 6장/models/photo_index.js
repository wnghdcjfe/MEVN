const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhotoSchema = new Schema({
    albumId: Number, 
	id: {type : Number, index : true},
    title: String, 
    url : String, 
    thumbnailUrl : String
})

module.exports = mongoose.model('Photo', PhotoSchema) 