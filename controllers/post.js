"use strict";
const Post = require("../model/Post");
const ejs = require("ejs");

module.exports = {
	create(req,res) {
		const userId = req.session.get("userId","");
		if (userId) {
			const data = req.body;
			data["user_id"] = req.session.get("userId");
			return Post.create(data)
				.then((err,result) => {
					if(err) return res.send(null,503);
					data.type = "";
					wss.send(JSON.stringify(data));
					return res.send();
				});
		}
		return res.send(null,401);
	},
	getOne(req,res) {
		const id = req.query.id;
		Post.getOne(id, (err,post) => {
			if(err) return res.send(null,503);
			return res.json(post);
		});
	},
	createView(req,res) {
		return res.render("include/partials/post",{ user: null, path: pathname });
	},
	postsView(req,res) {
		return res.render("include/partials/list-posts",{ user: null, path: pathname });
	},
	getAllPostForType(req,res) {
		const type = req.query.type;
		Post.find({ type: Number(type) })
			.then((posts) => {
				return res.send(JSON.stringify(posts));
			});
	}
}
