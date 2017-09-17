const mongodb   = require("mongodb");
const ObjectID  = mongodb.ObjectID;

const host   = process.env.hostDB || "127.0.0.1";
const port   = process.env.portDB || 27017;
const dbName = process.env.db   || "helpetdb";

const dbserver = new mongodb.Server(host, port, {});
const db = new mongodb.Db(dbName, dbserver);

module.exports = {
    connect(cb){
       db.open(cb); 
    },
    db: db
};