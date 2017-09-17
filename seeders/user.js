var bcrypt = require('bcrypt');
var User = require('../model/User');
var db = require('../db/con.js');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

db.connect(()=>{
    var users = [
        {
            "_id": new ObjectID("59ab1cf528ebef7de4d8860a"),
            "name":"usuario",
            "lastname":"1",
            "email":"usuario1@gmail.com",
            "password": bcrypt.hashSync("123456", 8)
        }
    ];

    let fUser = []

    users.forEach(function(user) {
        fUser.push(User.register(user));
    });

    Promise.all(fUser)
            .then(()=>process.exit())
            .catch(()=>console.log('dasdas'));

});

