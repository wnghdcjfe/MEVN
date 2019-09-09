const obj = {
  "이름" : "큰돌", 
  "나이" : 27,
  "나이2" : undefined
}
console.log(obj.이름) //큰돌
const _name = "이름"
console.log(obj[_name]) //큰돌
console.log(obj['이름']) //큰돌
console.log(obj['나이2']) // undefined 직렬화가 되지 않으므로 권장하지 않습니다.
console.log(Object.keys(obj)) // key값을 뽑아 낼 수 있습니다.


