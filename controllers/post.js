"use strict";
const Post = require("../model/Post");
const ejs = require("ejs");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const randomstring = require("randomstring");
module.exports = {
	create(req, res) {
		const userId = req.session.get("userId","");
		if(!userId) return res.send(null, 401);

		const form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			
			let data = fields;

			data.photo = path.join("uploads/", files.photo.name);
			data.userId  = userId;

			console.log(data);
			Post.create(data)
				.then((err,result) => {
					if(err) return res.send(null,500);
					data.type = "";
					return res.send();
				});
		});
		form.on("error", function(err) {
			return res.send(null, 500);
		});

		form.on("fileBegin", function(name, file) {
			let rdName = randomstring.generate();
			rdName = rdName.replace("/", "");
			let originalName = file.name;
			file.name = rdName + path.extname(originalName);
		});
	 
		form.on("end", function(fields, files) {
			const temp_path = this.openedFiles[0].path;
			const file_name = this.openedFiles[0].name;
			const new_location = path.join(__dirname, "../public/uploads/", file_name);
			
			fs.copy(temp_path, new_location, function(err) {  
				if (err) {
					console.error(err);
				} else {
					console.log("success!")
				}
			});
		});
		
	},
	getOne(req, res) {
		const id = req.query.id;
		Post.getOne(id, (err,post) => {
			if(err) return res.send(null,503);
			return res.json(post);
		});
	},
	createView(req, res) {
		return res.render("include/partials/post",{ user: null, path: pathname });
	},
	postsView(req, res) {
		return res.render("include/partials/list-posts",{ user: null, path: pathname });
	},
	getAllPostForType(req, res) {
		const type = req.query.type;
		Post.find({ type: Number(type) })
			.then((posts) => {
				return res.send(JSON.stringify(posts));
			});
	}
}
