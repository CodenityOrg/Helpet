var bcrypt = require('bcrypt');
var mongodb = require('mongodb');
var dbserver = new mongodb.Server("127.0.0.1",27017,{});
var db = new mongodb.Db('helpetdb', dbserver);
var ObjectID = mongodb.ObjectID;
var db = require('../db/con.js').db;

var users = db.collection('users');

module.exports.login = function(data,callback){
  console.log(data.password)
  return users.findOne({email:data.email}).then((user)=>{
    console.log(user)
    if(!user) throw 'No existe el usuario';
    return bcrypt.compare(data.password, user.password).then((checked)=>{
      console.log(checked)
      if(checked) return user;
      throw 'Contraseña incorrecta';
    });
  })

  
};

// module.exports.resetPassword = function(data,callback){

//     return new Promise((resolve,reject)=>{
//         users.findOne({email:email},function (err,user) {
//         if (err) {
//           db.close();
//           return callback(err);
//         }
//         if (!user) {
//         db.close();
//         return callback(null);
//         }

//         db.close();


//         });
//     })

    
  

// };

module.exports.register = function(data) {
  var hash = bcrypt.hashSync(data.password, 8);
  var user = {
    "_id":data._id,
    "email": data.email,
    "password": hash,
    "name": data.name,
    "lastname": data.lastname,
    "phone": data.phone
  }

  return new Promise((resolve,reject)=>{
    users.insert(user,resolve );
  }).then((err,result)=>{
    if(err) throw err;
    return result;
  });

};


module.exports.findOne = function(data){
  return users.findOne(data);
}


module.exports.getOne = function(id,callback){
  var objectId = new ObjectID(id);

  return users.findOne({_id:objectId});
  
  
}

// module.exports.savePreferenceUser = function(data, callback) {
//   db.open(function(err, db ) {
//     if(!err) {
//       //console.log("We are connected");
//       //var collection = db.collection('users');
//       // collection.find({'name': 'admin'}).toArray(function(err, docs) {
//       //   console.dir(docs);
//       // });
//       var users = db.collection('users');
//       var user = {
//         "feature": data.feature,
//         "latitude": data.latitude,
//         "longitude": data.longitude,
//         "distance" : data.distance
//       };
//       users.updateOne(user, function(err, result) {
//         callback(err,result);
//         db.close();
//       });
//     }
//   });
// };
