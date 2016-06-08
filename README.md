Facebook messenger webhook using AWS lambda and API gateway

Sample request:
  {"object":"page","entry":[ {"id":"1190047491030015","time":1460245674269,"messaging":[{ "sender":{"id":"100011898124774"},"recipient":{"id":"1190047491030015"},"timestamp":1460245672080,"message":{"mid":"mid.1460245671959:dad2ec9421b03d6f78", "seq":216,"text":"hello"}} ] }]}

  *Note: 
    Invalid fbid exception on AWS testing is ok, since the user id is not valid, sending messages from facebook would solve this.

Subscribe the page:
  curl -ik -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=$TOKEN"

Update the lambda function:
  Zip the node_module folder,webhook.js, witController.js and package.json as webhook.zip and upload to AWS lambda.

API gateway configuration:

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
