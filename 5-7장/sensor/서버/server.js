const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require("http").createServer(app)
const io      = require('socket.io')(http)
const util    = require('./util')()
const sensorController = require('./controller/sensor')
const path    = require('path')  
const path_dist   = path.join(__dirname, '..', './dist') 
const path_dist2   = path.join(__dirname, './dist') 
const img_path   = path.join(__dirname, './img')   
const PORT    = process.env.PORT || 12010 
const mongoose = require('mongoose') 
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`  
let userList = [];
const main = async()=>{
  //app 객체 설정 
  app.use('/', express.static(path_dist))  
  app.use('/', express.static(path_dist2))  
  app.use('/img', express.static(img_path))
  app.use(cors()) 
  // MongoDB connect 설정
  mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true}) 
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err))   
  mongoose.set('useFindAndModify', false);

  let toIdx = 10; 
  //io 객체 설정 
  const jsonArray = await util.readCSV();  
  io.on('connection', async (socket) =>{  
    console.log(`User connected :: ${util._date()} ID : ${socket.id}`)   
    userList.push(socket.id) 
    socket.on('disconnect', () => {  
      console.log(`User disconnected :: ${util._date()} ID : ${socket.id}`)  
      userList.splice(userList.indexOf(socket.id),1); 
    });       
    const sensor_first = await sensorController.emitSensorAndSaveStart(io, jsonArray, toIdx);  
    console.log(`Send to user Current Sensor And Save DB in first :: ${util._date()}`)    
  });   
  //센서데이타는 항상 받자 마자 emit을 해줘야 한다. 그 부분을 재현 
  const sensor = await sensorController.emitSensorAndSave(io, jsonArray);  
  toIdx = sensor.idx; 
  setInterval(async () => {    
    const sensor = await sensorController.emitSensorAndSave(io, jsonArray);  
    toIdx = sensor.idx;  
    console.log(`Send to user Current Sensor And Save DB :: ${util._date()} ${JSON.stringify(sensor)}`) 
  }, 5 * 1000); 
  http.listen(PORT, ()=> console.log(`센서서버가 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}
main();  