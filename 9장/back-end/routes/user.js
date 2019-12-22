const express = require('express')
const router = express.Router() 
const {db} = require('../lib/db') 
const _db = db(); 
const userController = require('../controllers/userController.js')(_db) 
const {checkToken} = require('../lib/jwt');   

module.exports = router;