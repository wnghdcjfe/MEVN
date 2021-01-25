const fs = require('fs')
const path = require('path') 
const MongoClient = require('mongodb').MongoClient
const mongoDB = 'mongodb://127.0.0.1'
const DBname = 'my_database'   
const main = async()=>{ 
    const client = await MongoClient.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true})
    .catch((err) => console.error(err))   
    const _path = path.join(__dirname, './data/photos.json')
    const t = JSON.parse(fs.readFileSync(_path).toString()) 
    const col = client.db(DBname).collection('Photo')  
    console.time('5000건의 데이타 삽입')
    col.insertMany(t, function(error, docs) {
        console.timeEnd('5000건의 데이타 삽입')
    })
}  
main()