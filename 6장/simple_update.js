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
  const t = await Photo.updateMany({
      "title" : {
        $eq : '큰돌'
      }
    }, {
      $set : {
        "url" : 'jhc9639@naver.com'
      }
    }, {
      upsert: true, 
      multi: true, 
      new : true
    }).lean();
  console.log(t)
}  
main();

const main2 = async()=>{  
  const t = await Photo.updateMany({
      "title" : {
        $in : ['큰돌', '홍철', '현영','승철']
      }
    }, {
      $set : {
        "url" : 'jhc9639@naver.com'
      }
    }, {
      upsert: true, 
      multi: true, 
      new : true
    }).lean();
  console.log(t)
}  
main2();
  