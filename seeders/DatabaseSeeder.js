"use strict";
const userSeeder = require('./UserSeeder');
const postSeeder = require('./PostSeeder');
const Bale = require('bale.js');  

const opts = {
    host: "localhost",
    port: 27017,
    dbname: "helpetdb",
    driver: "mongodb"
};

const bale = new Bale();

bale.connect(opts).then((seeder)=>{
    seeder.use(userSeeder);
    seeder.use(postSeeder);
    seeder.seed().then((msg) => {
        process.exit();
    });
})

