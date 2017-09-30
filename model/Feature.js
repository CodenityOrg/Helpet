"use strict";

const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

module.exports = {
    create(data) {
        const features = global.db.collection("features");
        return features.insert(data); 
    },

    find(q,limit){
        const features = global.db.collection("features");
        if(limit) features.find(q).limit(limit).toArray();
        return features.find(q).toArray();
    }
}
