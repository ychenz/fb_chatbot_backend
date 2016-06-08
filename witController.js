/**
 * Created by yzhao on 2016-05-18.
 */

const Wit = require('node-wit').Wit;
const uuid = require('node-uuid');
const fs = require('fs');
const FetchWeather = require('./fetchWeather');

var config = fs.readFileSync("config.json");
var loaded_config = JSON.parse(config);

const token = loaded_config.wit_server_token;

const EntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

//wit converse function
const WitController = function(sender,text,sendMessage){
	
	const actions = {
	  say(sessionId, context, message, cb) { //cb: wit.makeCallback.makeSayCallback()
		sendMessage(sender,message); // send back facebook message
		cb();
	  },
	  merge(sessionId, context, entities, message, cb) { //cb: wit.makeCallback.makeActionCallback()
	  
		// Retrieve the LoB entity and store it into a context field
		const location = EntityValue(entities, 'location');
		const datetime = EntityValue(entities, 'datetime');
		if (location) {
		  context.location = location;
		}
		if (datetime){
		  context.datetime = date
		}
		cb(context);
	  },
	  error(sessionId, context, error) {
		console.log(error.message);
		sendMessage(sender,"Sorry, something went wrong");
		return error.message;
	  },
	  ['fetch-weather'](sessionId, context, cb) {
		// Here should go the api call, e.g.:
		// context.forecast = apiCall(context.loc)
		/*
		/* TODO: openweathermap api call
		 */
		var location = context.location;
		var datetime = context.datetime;
		var weatherData = new FetchWeather(context,location,datetime,cb); 
		weatherData.getWeather();
	  },
	  //more actions
	};


	const client = new Wit(token, actions);
	const sessionId = uuid.v1();
	var context = {};
	client.runActions(
		sessionId, 
		text, 
		context
	);
}

module.exports = {
   WitController:WitController,
}; 
