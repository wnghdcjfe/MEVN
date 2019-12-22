const express = require('express');
const router = express.Router();
const userRoute= require('./user'); 
const authRoute = require('./auth.js');
const exhibitionRoute = require('./exhibition.js');
const goodsRoute = require('./goods.js');  

router.use('/user', userRoute); 
router.use('/auth', authRoute);
router.use('/exhibition', exhibitionRoute); 
router.use('/goods', goodsRoute); 

module.exports = router;  