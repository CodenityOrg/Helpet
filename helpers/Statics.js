var fs = require('fs');

module.exports = {
	
	read : function(file,cb) {
		fs.readFile('./public/'+file, cb);
	},
	readView : function(file,cb) {
		fs.readFile('./views/'+file, cb);
	}
}