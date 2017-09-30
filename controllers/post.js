"use strict";
const Post = require("../model/Post");
const ejs = require("ejs");
const formidable = require("formidable");
const fs = require("fs-extra");
const path = require("path");
const randomstring = require("randomstring");
const socket = global.wss;
const url  = require("url");

module.exports = {
	create(req, res) {
		const userId = req.session.get("userId","");
		if(!userId) return res.send(null, 401);
		const form = new formidable.IncomingForm();
		form.parse(req, (err, fields, files) => {
			let data = fields;
			data.photo = path.join("uploads/", files.photo.name);
			data.userId  = userId;
			Post.create(data)
				.then((err,result) => {
					if(err) return res.send(null,500);
					socket.send({
						title: "Nueva publicacion",
						type: "post",
						latitude: data.latitude,
						longitude: data.longitude,
						description: data.description,
						photo: data.photo
					});
					return res.send();
				});
		});

		form.on("error", (err) => {
			return res.send(null, 500);
		});

		form.on("fileBegin", (name, file) => {
			let rdName = randomstring.generate();
			rdName = rdName.replace("/", "");
			let originalName = file.name;
			file.name = rdName + path.extname(originalName);
		});
	 
		form.on("end", (fields, files) => {
			const temp_path = this.openedFiles[0].path;
			const file_name = this.openedFiles[0].name;
			const new_location = path.join(__dirname, "../public/uploads/", file_name);
			
			fs.copy(temp_path, new_location, (err) => {  
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
		const pathname = url.parse(req.url).pathname;
		return res.render("include/partials/post",{ user: null, path: pathname });
	},
	postsView(req, res) {
		const pathname = url.parse(req.url).pathname;
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
