var express = require('express');
var router = express.Router();
var request = require('request');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.HOST_NAME);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/getWeatherData', function(req, res, next) {
  // request({
  //   uri: 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API_KEY + '/' + req.body.latitude + ',' + req.body.longitude
  // }).pipe(res);
  res.send("OKAY");
});

module.exports = router;
