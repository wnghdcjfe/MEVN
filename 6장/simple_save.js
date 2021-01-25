const mongoose = require('mongoose')
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
mongoose.set('useFindAndModify', false)
mongoose.connect(mongodbURL, {useNewUrlParser: true}) 
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err))
const Photo = require('./models/photo.js')

const main = async()=>{ 
    const _data = {
        "albumId": 12010,
        "id": 12010,
        "title": "큰돌",
        "url": "jhc9639@naver.com",
        "thumbnailUrl": "https://via.placeholder.com/150/13454b"
    } 
    const new_photo = new Photo(_data) 
    const t = await new_photo.save()
    console.log(t)
}  
main() 