const bcrypt = require("bcrypt");
const db = require("../db/con.js").db;
const posts = db.collection("posts")

module.exports.create = (data) => {

  let { userId, photo, description, features, latitude, longitude, distance, type} = data;
  let post = { userId, photo, description, features, latitude, longitude, distance, type };

  return new Promise((resolve,reject)=>{
    posts.insert(post,resolve);
  }).then((err,post)=>{
    if(err) throw err;
    return post;
  });
}

module.exports.find = (data,limit) => {
  if(limit) return posts.find(data).limit(limit).toArray();
  return posts.find(data).toArray();
}

module.exports.remove = (data) => {  
  posts.remove({});
}

module.exports.getOne = (id,callback) => {
  const objectId = new ObjectID(id);

  return new Promise((resolve, reject)=>{
    posts.findOne({_id: objectId },resolve)
  }).then((err, posts)=>{
      if(err) throw err;
      return posts;
  });

};
