var bcrypt = require('bcrypt');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var db = require('../db/con.js').db;
var features = db.collection('features')

module.exports = {
    create(data) {
        return features.insert(data); 
    },

    find(q,limit){
        if(limit) features.find(q).limit(limit).toArray();
        return features.find(q).toArray();
    }
}

