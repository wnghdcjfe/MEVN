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
  const t = await Photo.updateMany({
      "title" : {
        $eq : '큰돌'
      }
    }, {
      $set : {
        "url" : 'jhc9639@naver.com'
      }
    }, {
      upsert: true, 
      multi: true, 
      new : true
    }).lean()
  console.log(t)
}  
main()

const main2 = async()=>{  
  const t = await Photo.updateMany({
      "title" : {
        $in : ['큰돌', '홍철', '현영','승철']
      }
    }, {
      $set : {
        "url" : 'jhc9639@naver.com'
      }
    }, {
      upsert: true, 
      multi: true, 
      new : true
    }).lean()
  console.log(t)
}  
// main2()
  