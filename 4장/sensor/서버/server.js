const express = require('express')
const app     = express()
const http    = require("http").createServer(app)
const io      = require('socket.io')(http); 
const path    = require('path')  
const _path   = path.join(__dirname, './dist')  
const PORT    = 12027
const sensorController = require('./controller/sensor'); 
const mongoose = require('mongoose');  
const mongoDB  = 'mongodb://127.0.0.1/my_database';
//계정 설정 MongoDB 계정 보안 설정 이야기
// mongoose.connect('mongodb://아이디:비밀번호@호스트:포트/admin', { dbName: '사용할 데이터베이스' });
  
 

const main = async ()=>{
  //app 객체 설정 
  app.use('/', express.static(_path)) 
  // const isDBconnection = await mongoose.connect(mongoDB, { useNewUrlParser: true });
  // console.log(isDBconnection); 
//   mongoose.connect(mongoDB, { useNewUrlParser: true })
// .then(() =>  console.log('connection succesful'))
// .catch((err) => console.error(err));
 
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

  // 이터레이러터를 만들어서 하는 것은..? yeild 하는 것은?
  let cnt = 0; 
  const jsonArray = await require('./sensorRead.js')().readCSV();
  const l = jsonArray.length;   
  setInterval(() => {
    let data = jsonArray[cnt % l]
    
    data.id = Number(data.id); 
    data.time = new Date(data.time); 
    data.temp = Number(data.temp); 
    data.wv = Number(data.wv); 
    data.humi = Number(data.humi);

    data = {cnt : cnt % l, ...data} 
    io.emit(data); 
    //sensorController.save(data); 
  }, 1000 * 10);
  //console.log(io.sockets)   
  app.listen(PORT, ()=> console.log(`센서서버 구동..! : 시작 http://127.0.0.1:${PORT}`));
}
main();  