//cors

//센서를 만드는 모듈 2018년짜리

//인증이 완료 되어야 get요청으로 보낼 수 있다. 

const express = require('express'); 
const app = express();  
app.listen(12010, ()=> {
  console.log('센서 REST API : 12010시작 http://127.0.0.1:12010');
});