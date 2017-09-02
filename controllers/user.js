var User = require('../model/User');

module.exports = {
	create: function(req,res) {
		var data = req.body;
						console.log(data)

		User.register(data)
			.then((result)=>{
				console.log('Entro aqui')
				console.log(result);
				return res.send();
			})
			.catch(()=>{
				return res.send(null,503);
			})
	},
	login: function(req,res){
		var data = req.body;
		
		if(!data.email) return res.send(null,421);
		if(!data.password) return res.send(null,421);

		User.login(data)
			.then((user)=>{
				console.log('saddsa')
				console.log(user._id)
				
				req.session.set('userId', user._id);
				return res.send();
			})
			.catch((err)=>{
				console.log(err)
				return res.send(null,503);
			})
	},
	savePreferences : function(req,res){
		var data = req.body;
		var userId = req.session.get('userId','');

		if(userId){
			return User.savePreferenceUser(data,function(err,result){
				if(err) return res.send(null,503);
				return res.send();
			})
		}

		return res.send(null,401);
	},
	logout: function(req,res){
		req.session.forget('userId');
		res.writeHead(301,
			{Location: '/'}
		);
		res.end();
	}
}
