const express = require('express')
const router = express.Router() 
 
const passport = require('passport')
const NaverStrategy = require('passport-naver').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

const {db} = require('../lib/db') 
const _db = db();   
const authController = require('../controllers/authController.js')(_db) 
const {checkToken} = require('../lib/jwt');    
router.get('/login/naver/callback', authController.naverLogin);  
 

module.exports = router;