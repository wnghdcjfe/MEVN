const express = require('express')
const path = require('path')
const app = express()
const img_path = path.join(__dirname, './img')
const PORT = 12010
const main = async () => { 
  app.use('/img', express.static(img_path))
  app.listen(PORT, () => console.log(`이미지제공 서버가 시작됩니다. http://127.0.0.1:${PORT}`))
}
main()