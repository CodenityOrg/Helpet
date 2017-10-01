"use strict";
const faker = require("faker");
const Bale = require("bale.js");
const bale = new Bale();

function roundBetween(fr, to){
    return Math.floor(Math.random() * to) + fr;
}


let seed = bale.genSeed("users", 20, (user) =>{
    user.name = faker.name.firstName();
    user.lastname = faker.name.lastName();
    user.description = faker.lorem.paragraph();
    user.email = faker.internet.email();
    user.password = "1234567"; 

    return user;
});

module.exports = seed;