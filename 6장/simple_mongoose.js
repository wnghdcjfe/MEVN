const mongoose = require('mongoose')
const Photo = require('./models/photo.js')
const fs = require('fs')
const path = require('path')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database' 
const _path = path.join(__dirname, './data/photos.json')
const main = async()=>{ 
    await mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err))

    const t = JSON.parse(fs.readFileSync(_path).toString()) 
    console.time('5000건의 데이타 삽입')
    Photo.insertMany(t, function(error, docs) {
        console.timeEnd('5000건의 데이타 삽입')
    })
}  
main()