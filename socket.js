const WebSocket = require('ws');
 
wss = new WebSocket.Server({ port: 8080 });
 
wss.on('connection', function connection(ws) {
  
	ws.on('message', function incoming(message) {

		
	});

});


//modularizacion de funciones 
