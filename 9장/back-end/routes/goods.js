const express = require('express')
const router = express.Router() 
const {db} = require('../lib/db') 
const _db = db();  
const goodsController = require('../controllers/goodsController.js')(_db) 
const {checkToken} = require('../lib/jwt');   

module.exports = router;