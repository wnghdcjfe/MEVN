const express = require('express'); 
const app = express(); 

//세션을 이용해서 한번 인증된 ip 는 그 session을 유지하게 한다. 
app.use(require('express-session')({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}))
//모듈화
app.use('/register', require('./routes/register'))


app.post('/auth', async (req, res)=>{
  const {ip, port} = req.body;
  const isValid = await userController.save(ip, port);
  if(isValid){
    res.sendStatus(200).send("OK");
  }else res.sendStatus(500).send("데이터 베이스 애러") 
})
//센서를 만드는 모듈 2018년짜리
app.get('/sensor/:from/:to', (req, res) =>{
  const {from, to} = req.params; 
  //ip 찾는 로직 필요
  const ip = req.ip; 
  const sensorData = makeSensor(from, to); 
  if(auth(ip)){
    const ret = {
      "code" : 1,
      "data" : sensorData
    } 
    ret.setHeader(); 
    res.send(ret);
  }else {
    const ret = {
      "code" : 0,
      "data" : "허용되지 않은 아이피"
    } 
    res.send(ret)
  }
})
 
const port = 12010
app.listen(port, ()=> console.log(`센서 REST API : 시작 http://127.0.0.1:${port}`));