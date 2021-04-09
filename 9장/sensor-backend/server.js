const constants = require('./contants') 
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const http = require("http").createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
}) 
const util = require('./util')()
const sensorController = require('./controller/sensorController')
const PORT = process.env.PORT || 12010
const mongoose = require('mongoose')
const USER = 'dabin'
const PWD = 'dabin12010'
const HOST = 'localhost:27017'
const DB = 'sensor' 
const SENSOR_FILE_PATH = path.join(__dirname, './data/data.csv')
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`  
let userList = [], idx = 0
const main = async () => {
  app.use(cors()) 
  mongoose.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`MongoDB connected ${util.getDate()} `))
    .catch((err) => console.error(err))
  mongoose.set('useFindAndModify', false)
 
  const sensorList = await util.readCSV(SENSOR_FILE_PATH)
  const len = sensorList.length

  io.on('connection', async (socket) => { 
    console.log(`User connected :: ${util.getDate()} ID : ${socket.id}`)
    userList.push(socket.id)
    socket.on('disconnect', () => {
      console.log(`User disconnected :: ${util.getDate()} ID : ${socket.id}`)
      userList.splice(userList.indexOf(socket.id), 1)
    })   
  })

  idx = await sensorController.sendDataAndSaveDB(io, sensorList, idx) 
  console.log(`Send to user Current Sensor And Save DB :: ${util.getDate()} ${JSON.stringify(sensorList[idx])}`)
  idx += 1 

  const timeInterval = setInterval(async () => {
    idx = await sensorController.sendDataAndSaveDB(io, sensorList, idx)
    console.log(`Send to user Current Sensor And Save DB :: ${util.getDate()} idx = ${idx} ${JSON.stringify(sensorList[idx])}`) 
    idx += 1
    if(idx === len){ 
      console.log(`Close sensor Service :: ${util.getDate()}`) 
      io.emit("closeSensorService", "byebye")
      clearInterval(timeInterval) 
    } 
  }, constants.INTERVAL) 
  http.listen(PORT, () => console.log(`Start Sensor Server ::: http://127.0.0.1:${PORT} :: ${util.getDate()}`))
}
main()