## MongoDB를 mac에서 설치하는 법
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

## MongoDB 구동 명령어
mongod --config /usr/local/etc/mongod.conf 

## 윈도우에서 MongoDB 명령어 구동설정
cmd로 mongo, mongod를 하고 싶다면 환경변수 > 시스템변수 > PATH수정
`C:\Program Files\MongoDB\Server\4.2\bin`이런식으로 MongoDB의 Server 폴더내의 bin폴더경로를 입력해주시면 됩니다. 

## 애러 - 권한오류
먼저 DB가 잘 생성되었는지 파악합니다. log라는 DB 생성여부를 파악합니다. 그 이후에 유저를 생성합니다.

1. mongo shell을 구동합니다.
2. log데이타베이스로 이동 `use log` 
3. 데이터베이스 확인 : `show dbs` 아직 log 생성되지 않았습니다. `use log`로 log 디비로 이동합니다.
4. 데이타베이스 생성 : db.log.insert({"kundol" : 1})
5. 데이터베이스 확인 : `show dbs` log DB가 생성되었습니다! 
6. 계정 생성 : 관리자계정 생성 이후 유저계정을 생성합니다.
```
use admin
db.createUser({ user: "root" , pwd: "root123", roles: ["userAdminAnyDatabase"], mechanisms : ["SCRAM-SHA-1"]})  

use log
db.createUser({  
 user:"dabin",
 pwd:"dabin12010",
 roles:[  
  {  
     role:"readWrite",
     db:"log"
  }
 ],
 mechanisms:[  
  "SCRAM-SHA-1"
 ]
})
``` 
 

 