const mongoose = require('mongoose');
const Photo = require('./models/photo.js');
const fs = require('fs')
const path = require('path')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));  

const main = async()=>{  
  const t = await Photo.findOne({
      "title" : {
        $eq : '큰돌'
      }, 
      "url" : {
        $eq : 'jhc9639@naver.com'
      }
    }).lean();
  console.log(t)
}  
main();
 