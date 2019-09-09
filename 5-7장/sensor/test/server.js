const express = require('express')
const app     = express()
const cors    = require('cors')  
const path    = require('path')  
const _path   = path.join(__dirname, './dist')  
const PORT    = 12010   
const main = async()=>{
  //app 객체 설정 
  app.use('/', express.static(_path))  
  app.use(cors())  
  app.listen(PORT, ()=> console.log(`테스트 서버가 시작됩니다. http://127.0.0.1:${PORT}`));
}

main();  