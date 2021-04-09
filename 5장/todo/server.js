const express = require('express')
const path = require('path') 
const app = express()
const PORT = 12010
const _path = path.join(__dirname, './dist')
console.log(_path)
app.use(express.static(_path))   
app.listen(PORT, ()=> { 
  console.log(`할일서버 : ${PORT}!`)
})
