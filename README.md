Apollo facebook messenger webhook

Sample request:
  {"object":"page","entry":[ {"id":"1190047491030015","time":1460245674269,"messaging":[{ "sender":{"id":"100011898124774"},"recipient":{"id":"1190047491030015"},"timestamp":1460245672080,"message":{"mid":"mid.1460245671959:dad2ec9421b03d6f78", "seq":216,"text":"hello"}} ] }]}

  *Note: 
    incoming message blocked, need hotspot. 
    Invalid fbid exception on AWS testing is ok, since the user id is not valid, sending messages from facebook would solve this.

Subscribe the page:(seems required everyday)
  curl -ik -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=EAAG0vkXyenhjjDEYvrY37jan4rMfCgV5t6SDk2wS4Wyil9HXD4mxFpEDJtHZAYBbdWVWD0tiJ1cO0LPa6LjkgZBCw9nLPz7hbDgbstXgz19vXcdmESDWGDP9RLaOmMoLdZA3zQxITmqMc4I5QSZBIF1ybjUDMXAOTjzdQM0"

Update the lambda function:
  Zip the node_module folder,webhook.js, witController.js and package.json as webhook.zip and upload to AWS lambda.

API:

get:
    request:
	application/json:
	{ 
 	 "token": "$input.params('hub.verify_token')",
 	 "challenge": "$input.params('hub.challenge')",
 	 "http_method": "$context.httpMethod"
	}
    respond: 
	text/plain: $input.path('$')
	

post:
    request:
	application/json:
	{
    "http_method": "$context.httpMethod",
    "body" : $input.json('$')
}
