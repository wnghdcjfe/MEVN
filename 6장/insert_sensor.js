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


const csvFilePath = './data/20190802_강동구.csv' 
const csv         = require('csvtojson') 
const path        = require('path')  
const _path       = path.join(__dirname, csvFilePath)  
const Sensor = require('./models/sensor.js')

const main = async()=>{  
  const sensorList = await csv().fromFile(_path)  
  //미리 있을 Sensor collection은 drop한다. 
  Sensor.collection.drop()
  Sensor.insertMany(sensorList, function(error, docs) {
      console.log('데이타 삽입완료')
  })
}  
main()
 