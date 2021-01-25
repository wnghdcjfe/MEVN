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
const Sensor = require('./models/sensor.js')


const main = async()=>{  
  const test1 = await Sensor.aggregate(
    [
      {$match : {temp : {$gte : 26}}}, // 조건을 설정
      {$group : {_id :"$id", total : {$sum : "$temp"}}} 
      // 그룹화할 유니크한 _id를 고른 후 그룹 후 모든 temp의 합계를 구합니다. 
    ]
  )
  console.log(test1)
 // [ { _id: 402, total: 31374.8 } ]
 
  const test2 = await Sensor.aggregate(
    [
      {$match : {$or : [{temp : {$gte : 26, $lte : 27}}, {humi : {$gte : 80}}]}}, // 조건을 설정
      {$group : {_id :"$id", count : {$sum : 1 }}}, 
      {$project : {_id : 0, count : 1}} // return되는 결과값의 영역을 설정합니다.
      // 그룹화할 유니크한 _id를 고른 후 그룹 후 모든 것들을 셉니다. 
    ]
  )  
  // [ { count: 565 } ]
  console.log(test2)

  const test3 = await Sensor.aggregate(
    [ 
      {$match : {$and : [{temp : {$eq : 26.2}}, {humi : {$eq : 85.7}}]}}, // 조건을 설정
      {$sort : {temp : 1}}, 
      {$limit : 5}, 
      {$project : {_id : 0, temp : 1, time: 1, min: {$minute : "$time"}}}, 
      {$match : {min : {$eq : 1}}}  
    ]
  )
  console.log(test3)
  //[ { time: 2019-08-01T15:01:00.000Z, temp: 26.2, min: 1 }]
}  
main()
 