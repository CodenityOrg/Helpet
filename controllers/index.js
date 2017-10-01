"use strict";
const Statics 	= require('../helpers/Statics');
const url 		= require('url');
const User 		= require('../model/User');
const Post 		= require('../model/Post');
const ejs 		= require('ejs');
const fetch 	= require('node-fetch');

module.exports = {
	indexView (req,res) {
		const userId = req.session.get("userId");
		const user = {};
		const pathname = url.parse(req.url).pathname;
		if (!userId) return res.render("index", { user:null, path: pathname });
		res.writeHead(301,
			{ Location: "/mapa"}
		);
		res.end();
	},
	mapView (req,res){
		const pathname = url.parse(req.url).pathname;
		const userId = req.session.get('userId');
		const data = {}
		
		data.path = pathname;
		
		const lostPosts = Post.find({type:0},10);
		const foundPosts = Post.find({type:1},10);

		Promise.all([
			lostPosts,
			foundPosts
		]).then(([ posts,foundPosts ])=>{
			posts.push(...foundPosts);
			data.posts = posts;

			let fnPopulatePost = []
			for (let i = 0, post; post = posts[i]; i++) {
				fnPopulatePost.push(User.findOne({_id:post.usersId}))
			}
			return Promise.all(fnPopulatePost);

		}).then((users) => {
			let posts = data.posts.map((post,index)=>{
				post.user = users[index];
				return post;
			});

			let lostPosts = [],
				foundPosts = [];
			
			for (var i = 0,post; post = posts[i]; i++) {
				if (post.type === 0) lostPosts.push(post);
				else foundPosts.push(post);
			}

			data.lostPosts = lostPosts;
			data.foundPosts = foundPosts;
			data.user = null;
			if (!userId) {
				return res.render("map",data);
			}
			User.getOne(userId)
				.then((user) => {
					data.user = user;
					return res.render("map",data);
				});
		});
	},
	registerView (req,res) {
		const pathname = url.parse(req.url).pathname;
		return res.render("register",{ user:null, path:pathname });
	},
	postView (req,res) {
		const pathname = url.parse(req.url).pathname;
		const userId = req.session.get("userId");

		if(!userId){ 
			res.writeHead(301,
				{ Location: "/"}
			);
			return res.end();
		}
		User.getOne(userId)
			.then((result) => res.render("post", { user: result, path: pathname }) );
	}

}
