/**
 * Created by yzhao on 2016-05-18.
 * witController tester
 * Usage: $node test.js
 */
 
'use strict'
const witController = require('./witController');
var incoming_message = "What's the weather of Beijing tonight";
var sender_id = "anyone";

//callback function that processes wit response
const pcb =(sender,text) => {
				console.log("To "+ sender_id + ": " + text);
			};
witController.WitController(sender_id,incoming_message,pcb);

