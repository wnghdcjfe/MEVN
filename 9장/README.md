# 9장 - 아트보리
DB 생성 및 유저생성
```js
use artbori
db.artbori.insert({"kundol":1 }) 
db.createUser({ user: "dabin", pwd: "dabin12010", roles:["readWrite"], mechanisms:["SCRAM-SHA-1"]})
Successfully added user: {
        "user" : "dabin",
        "roles" : [
                "readWrite"
        ],
        "mechanisms" : [
                "SCRAM-SHA-1"
        ]
}
```

## 구현할 목록
 - passport로 로그인 인증
 - 메인페이지 이달의 전시회, 작가, GOODS
 - 페이지 : 작가 블로그(작가소개, 전시회, GOODS)
 - 결제시스템 : GOODS 클릭 > 네이버 페이  
 
## 독자가 알아서 구현할 목록
 - 작가에게 좋아요 메세지 보내기 
 - 문의 페이지 

