const WebSocket = require("ws");

module.exports = function(server) {
	wss = new WebSocket.Server({ server });
	wss.on("connection", function connection(ws) {
		ws.on("message", function incoming(message) {
			console.log(message);
		});
	});

	return wss;
}

 
