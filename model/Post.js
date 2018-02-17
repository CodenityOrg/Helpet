"use strict";
const bcrypt = require("bcrypt");
const connection = require("../db/connect.js");


module.exports.create = (data) => {
  const posts = global.db.collection("posts");
  let { userId, photo, description, features, latitude, longitude, distance, type} = data;
  let post = { userId, photo, description, features, latitude, longitude, distance, type };
  post.createdAt = new Date();

  return new Promise((resolve,reject)=>{
    posts.insert(post,resolve);
  }).then((err,post)=>{
    if(err) throw err;
    return post;
  });
}

module.exports.find = (data,limit) => {
  const posts = global.db.collection("posts");

  if(limit) return posts.find(data).limit(limit).toArray();
  return posts.find(data).toArray();
}

module.exports.remove = (data) => {
  posts.remove({});
}

module.exports.getOne = (id,callback) => {
  const posts = global.db.collection("posts");
  const objectId = new ObjectID(id);

  return new Promise((resolve, reject)=>{
      posts.findOne({_id: objectId },resolve)
  }).then((err, posts)=>{
      if(err) throw err;
      return posts;
  });

};
