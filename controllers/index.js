var	Statics = require('../helpers/Statics'),
	url = require('url'),
	User = require('../model/User'),
	Post = require('../model/Post')
	ejs = require('ejs');
var fetch = require('node-fetch');


module.exports = {

	indexView : function(req,res) {
		let userId = req.session.get('userId'),
			user = {},
			pathname = url.parse(req.url).pathname;
		if(!userId){
			return res.render('index',{user:null,path:pathname});
		}
		User.getOne(userId)
			.then( (user) =>{
				res.render('index',{user:user,path:pathname})
			}).catch(e=>{console.log(e)});
	},

	mapView : function(req,res){
		let pathname = url.parse(req.url).pathname,
			userId = req.session.get('userId'),
			data = {}
		
		data.path = pathname;
		
		let lostPosts = Post.find({type:0},10);
			foundPosts = Post.find({type:1},10);

		Promise.all([
			lostPosts,
			foundPosts
		]).then((values)=>{
			let [posts,foundPosts] = values;
			posts.push(...foundPosts);
			data.posts = posts;

			let fnPopulatePost = []

			for (let i = 0,post; post = posts[i]; i++) {
				fnPopulatePost.push(User.findOne({_id:post.userId}))
			}
			return Promise.all(fnPopulatePost);

		}).then((users)=>{
			let posts = data.posts.map((post,index)=>{
				post.user = users[index];
				return post;
			});

			let lostPosts = [],
				foundPosts = [];
			
			for (var i = 0,post; post = posts[i]; i++) {
				if(post.type==0) lostPosts.push(post);
				else foundPosts.push(post);
			}

			data.lostPosts = lostPosts;
			data.foundPosts = foundPosts;
			data.user = null;
			if(!userId){
				return res.render('map',data);
			}
			User.getOne(userId)
				.then((user)=>{
					data.user = user;
					return res.render('map',data);
				});
		})
		.catch(()=>{

		});
		
	},

	infoView : function(req,res) {

	},

	registerView: function(req,res){
		var pathname = url.parse(req.url).pathname;
		return res.render('register',{ user:null, path:pathname });
	},
	postView : function(req,res){
		var pathname = url.parse(req.url).pathname;
		var userId = req.session.get('userId');

		User.getOne(userId)
			.then((result)=>{ res.render('post', {user:result,path:pathname}) });
	}

}
