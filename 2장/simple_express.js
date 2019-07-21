const express = require('express');
const path = require('path')
const app = express();
const _path = path.join(__dirname, './dist')
console.log(_path)
app.use('/dist', express.static(_path)) // 정적 컨텐츠를 사용자에게 제공할 때 사용되는 메서드입니다. 특정 path에 해당하는 자료들을 사용자가 접근가능하게끔합니다.
app.listen(12010, ()=> {
  console.log('너의 서버는? 12010!');
});