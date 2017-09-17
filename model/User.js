const bcrypt = require("bcrypt");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const db = require("../db/con.js").db;
const users = db.collection('users');

module.exports.login = (data) => {
  return users.findOne({ email: data.email }).then((user) => {
    if(!user) throw "No existe el usuario";
    const checked = bcrypt.compareSync(data.password, user.password);
    if(checked) return user;
    throw "Contraseña incorrecta";
  })
};

module.exports.register = (data) => {
  const hash = bcrypt.hashSync(data.password, 8);
  let { _id, email, password, name, lastname, phone } = data;
  let user = { _id, email, password, name, lastname, phone };
  return new Promise((resolve,reject)=> users.insert(user,resolve))
              .then((err,result)=>{
                  if(err) throw err;
                  return result;
              });
};

module.exports.findOne = (data) => {
  return users.findOne(data);
};

module.exports.getOne = function(id){
  const objectId = new ObjectID(id);
  return users.findOne({ _id:objectId });
}

