const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require("http").createServer(app)
const io      = require('socket.io')(http)
const util    = require('./util')()
const sensorController = require('./controller/sensor')
const path    = require('path')  
const _path   = path.join(__dirname, '..', './dist')  
const PORT    = 12010 
const mongoose = require('mongoose')
//계정 설정 MongoDB 계정 보안 설정 이야기 
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`
mongoose.connect(mongodbURL, {useNewUrlParser: true}); 
mongoose.set('useFindAndModify', false);
let userList = [];
const main = async()=>{
  //app 객체 설정 
  app.use('/', express.static(_path))  
  app.use(cors()) 
  // MongoDB connect 설정
  mongoose.connect(mongodbURL, {useNewUrlParser: true}) 
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err)) 
  //io 객체 설정 
  const jsonArray = await util.readCSV();  
  io.on('connection', async (socket) =>{  
    console.log(`User connected :: ${util._date()} ID : ${socket.id}`)   
    userList.push(socket.id) 
    socket.on('disconnect', () => {  
      console.log(`User disconnected :: ${util._date()} ID : ${socket.id}`)  
      userList.splice(userList.indexOf(socket.id),1); 
    });     
    const sensor_first = await sensorController.emitSensorAndSaveStart(io, jsonArray); 
    console.log(`Emit user Current Sensor And Save DB :: ${util._date()} ${JSON.stringify(sensor_first)}`)    
  });    
  setInterval(async () => {   
    const sensor = await sensorController.emitSensorAndSave(io, jsonArray); 
    console.log(`Emit user Current Sensor And Save DB :: ${util._date()} ${JSON.stringify(sensor)}`) 
  }, 1* 1000); 
  http.listen(PORT, ()=> console.log(`센서서버가 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}

main();  