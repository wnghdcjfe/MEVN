const mongoose = require('mongoose');
const Photo = require('./models/photo.js');
const fs = require('fs')
const path = require('path')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err)); 

const main = async()=>{ 
    const _data = {
        "albumId": 12010,
        "id": 12010,
        "title": "큰돌",
        "url": "https://via.placeholder.com/600/13454b",
        "thumbnailUrl": "https://via.placeholder.com/150/13454b"
    } 
    const new_photo = new Photo(_data) 
    const t = await new_photo.save();
    console.log(t)
}  
main(); 