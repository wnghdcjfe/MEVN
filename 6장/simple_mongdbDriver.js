const mongoose = require('mongoose');
const Photo = require('./models/photo.js');
const fs = require('fs')
const path = require('path')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));
const _path = path.join(__dirname, './data/photos.json')
const main = async()=>{
    const t = JSON.parse(fs.readFileSync(_path).toString()); 
    console.time('5000건의 데이타 삽입')
    Photo.insertMany(t, function(error, docs) {
        console.timeEnd('5000건의 데이타 삽입')
    });
}  
main();

const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  // Create a collection we want to drop later
  const col = client.db(dbName).collection('createIndexExample1');
  // Insert a bunch of documents
  col.insert([{a:1, b:1}
    , {a:2, b:2}, {a:3, b:3}
    , {a:4, b:4}], {w:1}, function(err, result) {
    test.equal(null, err);
    // Show that duplicate records got dropped
    col.aggregation({}, {cursor: {}}).toArray(function(err, items) {
      test.equal(null, err);
      test.equal(4, items.length);
      client.close();
    });
  });
});

