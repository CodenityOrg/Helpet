const server = require("../app.js").serv;
const port = process.env.port || 3000;
const hostname = process.env.host || "127.0.0.1";

server.listen(port,hostname, () => {
	console.log(`Server running on http://${hostname}:${port}`);
});
