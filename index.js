const azure = require('azure');
const mysql = require('mysql2');

var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("<h1>Hello World!</h1>");
	
});

var port = process.env.PORT || 1337;
server.listen(port);


const azureKey = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
const sqlAcc = {
    host: 'ww-user-db.mysql.database.azure.com',
    user: 'mysqldbuser@ww-user-db',
    password: 'z5CNFHhY!',
    port: 3306,
    ssl: true
};

const queueSvc = azure.createServiceBusService(azureKey);
const sqlConnection = mysql.createConnection(sqlAcc);

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

sqlConnection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});
