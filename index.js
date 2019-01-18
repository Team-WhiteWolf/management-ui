var $ = require('jquery');
var azure = require('azure');

const azureKey = 'Endpoint=sb://servicequeues.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=AUNiefT6dHz3ivqbYvpteI+LlwvOWE2M0OleRycSXzs=';
const asbService = azure.createServiceBusService(azureKey);

$('#nav1').click(function() {
	$('#main').empty();
	$('#main').load('icon.html', {}, function() {
		$('#file_submit').click(function() {
			asbService
		});
	});
});
