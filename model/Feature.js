var bcrypt = require('bcrypt');
"use strict";
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;

const db = require('../db/con.js').db;
const features = db.collection('features')

module.exports = {
    create(data) {
        return features.insert(data); 
    },

    find(q,limit){
        if(limit) features.find(q).limit(limit).toArray();
        return features.find(q).toArray();
    }
}

