const http = require('http')    
const PORT = 12010 
const server = http.createServer((req, res) => {  
  res.setHeader('Content-Type', 'text/plain charset=utf-8') 
  res.end('안녕하세요 MEVN프로젝트입니다.') 
})
 
server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`)
})