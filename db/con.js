const mongodb   = require("mongodb");
const MongoClient = mongodb.MongoClient;
const configDB = require("../config").db;

const env = process.env.NODE_ENV;

let host   = "127.0.0.1";
let port   = 27017;
let dbName = "helpetdb";
let user = "";
let password = "";

if (env === "production") {
    host = configDB.host;
    port = configDB.port;
    dbName = configDB.db;
    user = configDB.user;
    password = configDB.password;
}

module.exports = {
    connect() {
        let credentials = "";
        if (process.env.NODE_ENV === "production") {
            credentials = `${user}:${password}@`;
        }
        MongoClient.connect(`mongodb://${credentials}${host}:${port}/${dbName}`, (err, mDb) => {
            if(!err) {
                console.log("We are connected");
            }
            global.db = mDb;
        });
    }
};