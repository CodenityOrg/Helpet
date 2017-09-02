var bcrypt = require('bcrypt');
var User = require('../model/User');
var db = require('../db/con.js');
db.connect(()=>{
    var users = [
        {
            "_id":1,
            "name":"usuario",
            "lastname":"1",
            "email":"usuario1@gmail.com",
            "password": bcrypt.hashSync('123456', 8)
        },
        {
            "_id":2,
            "name":"usuario",
            "lastname":"2",
            "email":"usuario2@gmail.com",
            "password": bcrypt.hashSync('123456', 8)
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

