'use strict'
let db;

const MongoClient = require('mongodb').MongoClient;
const {PORT, USER, PWD, HOST, DB} = require('../config')   
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`    
exports.db_init = async() =>{
    if(!db){
        db = await MongoClient.connect(mongodbURL, {useNewUrlParser: true}).catch((err) => console.error(err)); 
    } 
}
exports.db = () => db