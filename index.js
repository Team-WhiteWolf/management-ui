const azure = require('azure');

var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("<center>"+
		"<h1>Managment UI</h1>"+
		"</center>");
	
});

var port = process.env.PORT || 1337;
server.listen(port);


const azureKey = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';


const queueSvc = azure.createServiceBusService(azureKey);

var message = {
	keks: 'test',
	body: 'Test message',
	customProperties: {
		testproperty: 'TestValue'
	}
};

queueSvc.sendQueueMessage('user-send', message, function(error){
	if(!error){
		console.log('Message sent!');
	}
});

queueSvc.receiveQueueMessage('user-send', function(error, receivedMessage){
	if(!error){
		// Message received and deleted
		console.log(receivedMessage.body);
	}
});

