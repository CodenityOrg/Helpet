const server = require("../app.js").serv;
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || "0.0.0.0";


server.listen(port, hostname, () => {
	console.log(`Server running on http://${hostname}:${port}`);
});
