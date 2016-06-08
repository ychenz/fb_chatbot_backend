const fs = require('fs');
var request = require('request');
 
var config = fs.readFileSync("config.json");
var loaded_config = JSON.parse(config);

const appid = loaded_config.openweathermap_appid;
const base_url = loaded_config.openweathermap_url;

//FetchWeather({},"waterloo");

var FetchWeather = function (context,location,datetime,cb){
  this.context = context;
  this.url = base_url+"?APPID="+appid+"&q="+location;
  this.cb= cb;
}

FetchWeather.prototype.getWeather = function() {
  var response = {};
  request({
    url: this.url,
    method: 'GET'
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
	  
	  /*
	  /* TODO: detect error
	  */
	  console.log(error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
	  /*
	  /* TODO: detect error
	  */
	  console.log(response.body.error);
    }else{
	  var response = JSON.parse(body);
	  var temp = response.main.temp - 273.15;
	  console.log(temp);
	  console.log(response.weather[0].description);
	  this.context.location = response.name;
	  this.context.forecast = temp + "C "+ response.weather[0].description;
	  this.cb(this.context);
    }
  }.bind(this));
}

module.exports = FetchWeather;

