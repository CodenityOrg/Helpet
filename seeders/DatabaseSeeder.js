"use strict";
const userSeeder = require('./UserSeeder');
const postSeeder = require('./PostSeeder');
const Bale = require('bale.js');  
const configDB = require("../config").db;
const env = process.env.NODE_ENV;
const opts = {
    driver: "mongodb"
};

if (env === "production") {
    opts.host = configDB.host;
    opts.port = configDB.port;
    opts.dbname = configDB.dbname;
    opts.user = configDB.user;
    opts.password = configDB.password;
} else {
    opts.host   = "127.0.0.1";
    opts.port   = 27017;
    opts.dbname = "helpetdb";
}

const bale = new Bale();

bale.connect(opts).then((seeder) => {
    seeder.use(userSeeder);
    seeder.use(postSeeder);
    seeder.seed().then((msg) => {
        process.exit();
    });
})

