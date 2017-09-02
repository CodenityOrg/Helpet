var bcrypt = require('bcrypt');
var db = require('../db/con.js').db;
var posts = db.collection('posts')

module.exports.create = function(data) {

  let post = {
    userId: data.userId,
    photo: data.photo,
    description:data.description,
    feature: data.feature,
    latitude: data.latitude,
    longitude: data.longitude,
    distance : data.distance,
    type: data.type
  };

  return new Promise((resolve,reject)=>{
    posts.insert(post,resolve);
  }).then((err,post)=>{
    if(err) throw err;
    return post;
  });
}

module.exports.find = function(data,limit){
  if(limit) return posts.find(data).limit(limit).toArray();
  return posts.find(data).toArray();
}


module.exports.remove = function(data) {  
  
  posts.remove({});

}

module.exports.getOne = function(id,callback){

  var objectId = new ObjectID(id);

  return new Promise((resolve,reject)=>{
    posts.findOne({_id:objectId},resolve)
  }).then((err,posts)=>{
      if(err) throw err;
      return posts;
  })

  // posts.findOne({_id:objectId},function (err,post) {
  //   if (err) {
  //       callback(err);
  //   }
  //   if (!post) {
  //       callback(null);
  //   }
  //   console.log(post)
  //   callback(null,post);

  // });

};
