const express = require('express')
const app = express(); 
const cors    = require('cors')
const http    = require("http").createServer(app)
const io      = require('socket.io')(http) 
const path    = require('path')  
const mongoose = require('mongoose')  
const util = require('./util')()
const middleware = require('./middleware/logging.js')()
const specController = require('./controllers/specController.js') 
const testController = require('./controllers/testController.js')
const logController = require('./controllers/logController.js')
const ErrorLogController = require('./controllers/ErrorLogController.js')
const errorCode = require('./config').errorCode

const path_dist   = path.join(__dirname, '..', 'front-end/dist')   
const {PORT, USER, PWD, HOST, DB} = require('./config')   
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`    
 
const main = async()=>{
  //app 객체 설정 
  app.use('/', express.static(path_dist))    
  app.use(cors())  
  app.use(middleware.morganLog()) 
  app.get('/test', testController.sendComment)
  app.get('/test_request', testController.testing) 
  // error handler
  app.use((error, req, res, next) =>{    
      console.log(`${util._date()} :: Error ${error}`)   
      const message = error.message.replace(/"|\\/g, ''); 
      const founded = errorCode.find(e => e.name.test(message)) 
      const code = founded ? founded.code : 100000  
      ErrorLogController.save({time : new Date(), message : message, error : error.stack, code : code})
      return res.status(500).send({message: "서버에서 오류가 발생했습니다.", code : code}); 
  });  
  
  // MongoDB connect 설정   
  await mongoose.connect(mongodbURL, {useNewUrlParser: true, useUnifiedTopology: true}) 
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err))   
  mongoose.set('useFindAndModify', false);

  io.on('connection', async (socket) =>{  
    console.log(`User connected :: ${util._date()} ID : ${socket.id}`)     
  });  
  // 5초마다
  setInterval(async () => { 
    testController.reqPer5()
    const spec = await specController.getSpec();   
    const log = await logController.getResTimeLatest('/test', 10); // 50초이후에 하면 됩니다.
    io.emit("spec", spec);  
    io.emit("log", log);  
    specController.save(spec);    
  }, 5 * 1000);   
 
  http.listen(PORT, ()=> console.log(`로그시스템이 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}
main();  