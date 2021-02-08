# 실시간 시각화 예제입니다. 

## 의존성 다운로드
```
npm install
```

### 클라이언트 테스트 서버 구동
```
npm run serve
```
### 서버 구동
```
node server
```

### dist폴더에 빌드하기 
```
npm run build
```

### MongoDB 구동 명령어
mongod --config /usr/local/etc/mongod.conf

## MongoDB 명령어 구동설정
cmd로 mongo, mongod를 하고 싶다면 환경변수 > 시스템변수 > PATH수정
`C:\Program Files\MongoDB\Server\4.2\bin`이런식으로 MongoDB의 Server 폴더내의 bin폴더경로를 입력해주시면 됩니다. 

## 애러 - 권한오류
먼저 DB가 잘 생성되었는지 파악합니다. sensor라는 DB 생성여부를 파악합니다. 

1. mongo shell을 구동합니다.
2. sensor데이타베이스로 이동 `use sensor` 
3. 데이터베이스 확인 : `show dbs` 아직 sensor가 생성되지 않았습니다.
4. 데이타베이스 생성 : db.sensor.insert({"kundol" : 1})
5. 데이터베이스 확인 : `show dbs` sensor DB가 생성되었습니다! 

그 이후에 user를 추가합니다. 
```shell
db.createUser({  
 user:"dabin",
 pwd:"dabin12010",
 roles:[  
  {  
     role:"readWrite",
     db:"sensor"
  }
 ],
 mechanisms:[  
  "SCRAM-SHA-1"
 ]
})
``` 
 

 