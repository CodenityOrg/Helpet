const http = require('http'),
	url = require('url');

const socket = require('./socket.js');

const index = require('./routes/index.js'),
	mHack = require('./server/mhack.js');

const app = mHack();

var db = require('./db/con.js');
db.connect();

app.use(index);

const serv = http.createServer(app.server);

module.exports = { serv };
