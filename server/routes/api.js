var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');
var after = require('after');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.HOST_NAME);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/getWeatherForecast', function(req, res, next) {
  request({
    uri: 'https://api.darksky.net/forecast/' + process.env.DARK_SKY_API_KEY + '/' + req.body.latitude + ',' + req.body.longitude
  }).pipe(res);
});

router.post('/getWeatherPastYear', function(req, res, next) {
  var finished = after(12, sendArray);
  var weatherArray = [];
  var time = moment();
  for (var i = 0; i < 12; ++i) {
  	request(
	    'https://api.darksky.net/forecast/' +
	    process.env.DARK_SKY_API_KEY + '/' +
	    req.body.latitude + ',' +
	    req.body.longitude + ',' +
	    time.subtract(1, 'months').unix(),
		function(error, response, body) {
			weatherArray.push(JSON.parse(body));
			finished();
		}
	);
  }

  function sendArray() {
    weatherArray.sort(function(a,b) {return a.currently.time - b.currently.time});
    for (var i = 0; i < 12; ++i) {
      weatherArray[i] = JSON.stringify(weatherArray[i]);
    }
  	res.json(weatherArray);
  }
});

module.exports = router;
