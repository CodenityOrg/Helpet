const fs = require("fs");

module.exports = {
	read (file,cb) {
		fs.readFile(`./public/${file}`, cb);
	},
	readView (file,cb) {
		fs.readFile(`./views/${file}`, cb);
	}
}