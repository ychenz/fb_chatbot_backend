/**
 * Created by yzhao on 2016-05-16.
 *
 * Apollo facebook messenger webhook with Amazon AWS Lambda and API Gateway
 * Main send/receive function
 */

'use strict';
console.log('Loading event');
var request = require('request');
const fs = require('fs');
const witController = require('./witController');



var config_file = fs.readFileSync("config.json");
var config = JSON.parse(config_file);
//token for theia page
const token = config.fb_page_token;

exports.handler = function(event, context) {
  if( event.http_method === "GET"){
    if (event.token === config.fb_verify_token){
      context.done(null, event.challenge); // return challenge content to facebook webhook verification call, mapped by AWS API Gateway from hub.challenge to challenge
    }else{
      context.done(null, "Error, wrong validation token");
    }
	
  //when http method is post, new message has been received,processing messages
  }else{
	  
	  //retrieving tex message and sender from incoming json body (mapped to event object by API gateway)
       var messaging_events = event.body.entry[0].messaging;
       for (var i = 0; i < messaging_events.length; i++) {
           var msg = event.body.entry[0].messaging[i];
           var sender = msg.sender.id;
           if ( msg.message && msg.message.text ){
               var text = msg.message.text;
			   
			   //witController uses async node-wit library, calls sendTextMessage
			   witController.WitController(sender,text,sendTextMessage);
           }
       }
  }
};

//send facebook response message
function sendTextMessage(sender, text) {
  var messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
	  
	  /*
	  /* TODO: detect error and notify intact backend
	  */
	  
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
	  /*
	  /* TODO: detect error and notify intact backend
	  */
    }
  });
}
