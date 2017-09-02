var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var dbserver = new mongodb.Server("127.0.0.1",27017,{});
var db = new mongodb.Db('helpetdb', dbserver);

module.exports = {
    
    connect(cb){
       db.open(cb); 
    },

    db:db

};