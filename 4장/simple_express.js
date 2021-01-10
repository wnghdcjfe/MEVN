const express = require('express')
const path = require('path')
const logger = require('morgan') 
const app = express()
const PORT = 12010
const _path = path.join(__dirname, './dist') // --- (1)
console.log(_path)
app.use('/dist', express.static(_path))  
app.use(logger('tiny'))  // --- (2)
//커스텀 미들웨어
app.use((req, res, next)=>{  // --- (3)
  console.log('요청이 왔네요~ 지나갑니다~')
  next() 
})

app.get('/book/:bookName', (req, res)=>{  // --- (4)
  const {bookName} = req.params 
  res.send(`안녕하세요 홍철이네 서점입니다. ${bookName}을 주문하셨군요!`) 
})
app.listen(PORT, ()=> { // --- (5)
  console.log(`너의 서버는? ${PORT}!`)
})
