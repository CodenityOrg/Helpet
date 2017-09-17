let ejs = require('ejs'),
    url = require('url'),
    router = require('./router'),
    path = require('path');

let NodeSession = require('node-session');
    
let session = new NodeSession({
    secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
    lifetime: 24 * 60 * 60 * 1000,
    driver: 'file'
});



module.exports = (function(req,res){
    var viewPath = path.join(__dirname,'..', 'views');

    let methods = {
        init(req,res){
            
            //Default template engine is EJS
            session.startSession(req, res,function(err){
            
                let body = "",
                    pathname = url.parse(req.url).pathname;
                
                res.render = function(view,data) {
                    let fullPath = path.join(viewPath,view +'.ejs');
                    return ejs.renderFile(fullPath, data, {}, function(err, str){
                        if(err){
                            console.log(err)
                            return res.send(err);
                        } 
                        return res.send(str);
                    });
                }

                res.json =  function(data) {
                    this.writeHead(200,{ 'Content-Type': 'application/json'});
                    this.send(JSON.stringify(data));
                }
        
                res.send = function(file,code) {
        
                    if(!code) code = 200;
        
                    if(file){
                        this.writeHead(200,{ 'Content-Type': 'text/html' })
                        this.write(file);
                    }
                    this.end();
                }
        
                if (["POST","PUT"].indexOf(req.method) >= 0) {
                    
                    if (req.headers["content-type"].indexOf("multipart/form-data") < 0){
                        req.on('data', function (chunk) {
                            body += String(chunk);
                        });
                        req.on('end', function () {
                            if(body&& !(body instanceof Object))	req.body = JSON.parse(body);
                            router.check(pathname,req,res);
                        });
                    } else {
                        router.check(pathname,req,res);
                    }
        
                    return;
                } else {
                    req.query = url.parse(req.url,true).query;
                    router.check(pathname,req,res);
                }

                
            });
        }
    }
    

    
    return {
        server(req,res){
            methods.init(req,res);
        },
        use(route){
            router.use(route)
        }
    };

})