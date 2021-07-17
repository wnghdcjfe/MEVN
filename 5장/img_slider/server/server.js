const express = require('express')
const path = require('path')
const app = express()
const img_path = path.join(__dirname, './img')
const PORT = 12010
const main = async () => { 
  app.use('/img', express.static(img_path))
  app.listen(PORT, console.log(`이미지서버시작`))
}
main()