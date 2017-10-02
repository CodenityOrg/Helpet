"use strict";
const User = require("../model/User");

module.exports = {
	create(req,res) {
		const data = req.body;
		User.register(data)
			.then((result) => {
				return res.send();
			})
			.catch(() => {
				return res.send(null,503);
			});
	},
	login(req,res){
		const data = req.body;
		
		if (!data.email) return res.send(null,401);
		if (!data.password) return res.send(null,401);
		User.login(data)
			.then((user) => {
				req.session.set("userId", user._id);
				return res.send();
			})
			.catch((err) => {
				return res.send(null, 401);
			});
	},
	savePreferences(req,res){
		const data = req.body;
		const userId = req.session.get("userId","");

		if (userId) {
			return User.savePreferenceUser(data, (err,result) => {
				if(err) return res.send(null,503);
				return res.send();
			});
		}

		return res.send(null,401);
	},
	logout: function(req,res){

		req.session.set("userId", "");
		console.log(req.session.get("userId"));
		res.writeHead(301,
			{ Location: "/"}
		);
		res.end();
	}
}
