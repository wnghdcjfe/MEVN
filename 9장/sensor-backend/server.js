const constants = require('./contants') 
const express = require('express')
const app = express()
const cors = require('cors')
const http = require("http").createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
})
const util = require('./util')()
const sensorController = require('./controller/sensor')
const PORT = process.env.PORT || 12010
const mongoose = require('mongoose')
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'sensor'
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`  
let userList = [], idx = 0
const main = async () => {
  app.use(cors())
  // MongoDB connect 설정
  mongoose.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err))
  mongoose.set('useFindAndModify', false)
 
  const jsonArray = await util.readCSV() 
  const len = jsonArray.length
  io.on('connection', async (socket) => { 
    console.log(`User connected :: ${util.getDate()} ID : ${socket.id}`)
    userList.push(socket.id)
    socket.on('disconnect', () => {
      console.log(`User disconnected :: ${util.getDate()} ID : ${socket.id}`)
      userList.splice(userList.indexOf(socket.id), 1)
    })   
  })

  idx = await sensorController.sendDataAndSaveDB(io, jsonArray, idx) 
  console.log(`Send to user Current Sensor And Save DB :: ${util.getDate()} ${JSON.stringify(jsonArray[idx])}`)
  idx += 1 
  const timeInterval = setInterval(async () => {
    idx = await sensorController.sendDataAndSaveDB(io, jsonArray, idx)
    console.log(`Send to user Current Sensor And Save DB :: ${util.getDate()} idx = ${idx} ${JSON.stringify(jsonArray[idx])}`) 
    idx += 1
    if(idx === len){
      clearInterval(timeInterval)
      io.emit("closeSensorService", "byebye")
    } 
  }, constants.INTERVAL) 
  http.listen(PORT, () => console.log(`Start Sensor Server ::: http://127.0.0.1:${PORT} :: ${util.getDate()}`))
}
main()