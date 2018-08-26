"use strict";
const http = require("http");
const url = require("url");
const socket = require("./socket.js");
const index = require("./routes/index.js");
const mHack = require("./server/mhack.js");
const boot = require("./boot/index");

const app = mHack();
let isLoaded = false;

const db = require("./db/connect.js");
db.connect();
app.use(index);


const serv = http.createServer(app.server);
global.wss = socket(serv);

module.exports = { serv };

