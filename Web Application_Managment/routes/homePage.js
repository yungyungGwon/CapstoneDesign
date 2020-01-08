var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homePage');
});
router.get('/loginPage', function(req, res, next) {
  console.log(req);
  res.render('loginPage');
});
router.get('/homeAPage',function(req,res,next){
  res.render('homeAPage');
});
router.get('/monitoringPage', function(req, res, next){
  res.render('monitoringPage');
});
router.get('/messagePage',function(req,res,next){
  res.render('messagePage');
});
router.get('/userSettingPage',function(req,res,next){
  res.render('userSettingPage');
});
router.get('/helpPage',function(req,res,next){
  res.render('helpPage');
});
router.get('/searchPage',function(req,res,next){
  res.render('searchPage');
});
module.exports = router;
