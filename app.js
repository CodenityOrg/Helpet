let http = require('http'),
	url = require('url');

let socket = require('./socket.js');

let index = require('./routes/index.js'),
	mHack = require('./server/mhack.js');



let app = mHack();

var db = require('./db/con.js');
db.connect();

app.use(index);

const serv = http.createServer(app.server);

module.exports = { serv:serv };
