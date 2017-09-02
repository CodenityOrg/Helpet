var Post = require('../model/Post'),
	ejs = require('ejs');

module.exports = {
	create: function(req,res) {
		var userId = req.session.get('userId','');

		if(userId){
			var data = req.body;
			data["user_id"] = req.session.get('userId');

			return Post.create(data)
				.then((err,result) => {
					if(err) return res.send(null,503);

					data.type="";
					wss.send(JSON.stringify(data));

					return res.send();

				});
		}

		return res.send(null,401);
	},
	getOne: function(req,res) {
		var id = req.query.id;

		Post.getOne(id,function(err,post) {
			if(err) return res.send(null,503);

			return res.json(post);
		})
	},
	createView : function(req,res){
		return ejs.renderFile('./views/include/partials/post.ejs', {user:null}, {}, function(err, str){
			return res.send(str);
		});
	},
	postsView : function(req,res){
		return ejs.renderFile('./views/include/partials/list-posts.ejs', {user:null}, {}, function(err, str){
			return res.send(str);
		});
	},
	getAllPostForType : function(req,res){
		var type = req.query.type;
		Post.find({type:Number(type)})
			.then((posts)=>{
				console.log(posts)
				return res.send(JSON.stringify(posts));
			});
	}
}
