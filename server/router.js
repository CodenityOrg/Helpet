var fs = require('fs'),
    path = require('path'),
    url = require('url');

let routes = [];

var server = {
    use: function(route) {
        routes.push(route);
    },

	check: function(pathname,req,res) {
        let allowedAssetRes = ["js","css","uploads","img"],
            assetResource = pathname.split("/")[1];

		if(allowedAssetRes.indexOf(assetResource)>=0) {
            this.static("./public", pathname, req, res);
        } else {
            for (var i = 0, route; route = routes[i]; i++) {
                if (route[pathname]) {
                    if (route[pathname][req.method]) {
                        return route[pathname][req.method](req, res);
                    } else {
                        return res.end("Not found");
                    }
                }
            }
            return res.end("Not found");
        }
    },

    static: function(route, pathname, req, res) {

        fs.readFile(route + "" + pathname, function(err, static) {
            if (!static) {
                res.writeHead(404);
                res.end();
                return;
            }

            var file = pathname,
                ext = path.extname(file),
                opts = {};

			switch (ext) {
				case '.js':
		    		opts["Content-Type"]  = "text/javascript";
					break;
				case '.css':
		    		opts["Content-Type"] = "text/css";
					break;
				case '.jpg':
			    	opts["Content-Type"] = "image/jpeg";
			    	break;
		    	case '.png':
			    	opts["Content-Type"] = "image/png";
			    	break;	    	
			}
			
	    	res.writeHead(200,opts);
	    	res.write(static);
	    	res.end();



        });


    }
}

module.exports = server;