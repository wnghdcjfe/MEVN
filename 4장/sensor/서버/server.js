const express = require('express')
const app     = express()
const cors    = require('cors')
const http    = require("http").createServer(app)
const io      = require('socket.io')(http);  

const sensorController = require('./controller/sensor'); 
const path    = require('path')  
const _path   = path.join(__dirname, './dist')  
const PORT    = 12010 
const mongoose = require('mongoose');   
//계정 설정 MongoDB 계정 보안 설정 이야기 
// const mongodbURL = 'mongodb://root:kundol12010@localhost:27017/admin';
// mongoose.connect(mongodbURL, {useNewUrlParser: true});  
const main = async ()=>{
  //app 객체 설정 
  app.use('/', express.static(_path)) 
  conso
  app.use(cors())
  //MongoDB Connection
  // const isDBconnection = await mongoose.connect(mongoDB, { useNewUrlParser: true });
  // console.log(isDBconnection); 
//   mongoose.connect(mongoDB, { useNewUrlParser: true })
// .then(() =>  console.log('connection succesful'))
// .catch((err) => console.error(err));
  //io 객체 설정
  io.on('connection', (socket, b) =>{
    //socket client 이벤트 연결 
    //두번째 인자에는 뭐가 있을지 궁금
    console.log(b)
    socket.on('chat message', (msg) =>{
      console.log('message: ' + msg);
    }); 
    socket.on('disconnect', (client) => {
      //client 빼기 
      //clients.splice(clients.indexOf(io.nickname),1); 
    }); 
  }); 
  // const jsonArray = await require('./sensorRead.js')().readCSV();
  // setInterval(() => {   
  //   await sensorController.emitSensorAndSave(io, jsonArray); 
  // }, 10 * 1000);   

  app.listen(PORT, ()=> console.log(`센서서버 구동..! : 시작 http://127.0.0.1:${PORT}`));
}

main();  