const express = require('express')  
const app     = express();  
const http    = require("http").createServer(app) 
const io      = require('socket.io')(http) 

const path    = require('path')     
const {db_init} = require('./lib/db.js')
const cookieParser = require('cookie-parser') 
const {checkToken} = require('./lib/jwt')    
const util = require('./util')() 

const path_dist   = path.join(__dirname, '..', 'front-end/dist')   
const path_dist_index   = path.join(__dirname, '..', 'front-end/dist/index.html') 
const {PORT} = require('./config')      
 
const main = async()=>{
  await db_init();   
  app.use(cookieParser())    
  //express가 4.16 버전부터 bodyparser지원
  app.use(express.json())    
  app.use(checkToken)

  //app 객체 설정  
  app.use('/', express.static(path_dist))   
  app.use('/api', require('./routes/index.js'));     
  // 애러핸들러 
  app.use((error, req, res, next) =>{      
      console.log(`${util._date()} :: Error ${error}`)    
      ErrorLogController.save(util.setError(error))
      return res.status(500).send({message: "서버에서 오류가 발생했습니다.", code : code}); 
  });   

  app.get('*', (req, res) => {
    res.sendFile(path_dist_index);
  });
  http.listen(PORT, ()=> console.log(`아트보리가 시작됩니다. http://127.0.0.1:${PORT} :: ${util._date()}`));
}
main();  