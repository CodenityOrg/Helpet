"use strict";
const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const connection = require("../db/connect.js");

module.exports.login = (data) => {
  const users = global.db.collection("users");
  return users.findOne({ email: data.email }).then((user) => {
    if(!user) throw "No existe el usuario";
    const checked = bcrypt.compareSync(data.password, user.password);
    if(checked) return user;
    throw "Contraseña incorrecta";
  })
};

module.exports.register = (data) => {
  const users = global.db.collection("users");
  const hash = bcrypt.hashSync(data.password, 8);
  const password = hash;
  let { _id, email, name, lastname, phone } = data;
  let user = { _id, email, password, name, lastname, phone };
  return new Promise((resolve,reject)=> users.insert(user,resolve))
              .then((err,result)=>{
                  if(err) throw err;
                  return result;
              });
};

module.exports.findOne = (data) => {
  const users = global.db.collection("users");
  return users.findOne(data);
};

module.exports.getOne = (id) => {
  const users = global.db.collection("users");
  const objectId = new ObjectID(id);
  return users.findOne({ _id:objectId });
}
