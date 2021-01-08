import express from 'express' 
import path from 'path'

const PORT = 12010
const app = express()
const __dirname = path.resolve()
const _path = path.join(__dirname, './dist')
app.use('/', express.static(_path)) 
app.listen(12010, ()=> {
  console.log('lazy 이미지서버가 구동됩니다. port : http://127.0.0.1:1${PORT}')
})