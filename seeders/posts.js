var db = require('../db/con.js');
var Post = require('../model/post');
var photos = ["perrito1.png","perrito2.jpg","perrito3.jpg"];

db.connect(()=>{

    Post.remove();

    var posts = [
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        },
        {
            "photo":"",
            "description":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus modi, beatae culpa dolores unde quas placeat. Impedit, earum eum voluptatibus est, nulla consequuntur molestiae sequi et minus, quis beatae sapiente!",
            "latitude":-18,
            "longitude":-70        
        }
    ];

    var fCreate = []

    posts.forEach((post)=>{
        var userId = "59ab1cf528ebef7de4d8860a"; 
        var type = Math.floor((Math.random()*1)+0);
        var photoIndex = Math.floor((Math.random()*2)+0);
        post.latitude -= ((Math.random()*10)+9)/100;
        post.longitude -= ((Math.random()*10)+9)/100;
        post.userId = userId;
        post.type = type; 

        post.photo = "/uploads/"+ photos[photoIndex];

        fCreate.push(Post.create(post));
    });

    Promise.all(fCreate)
        .then(()=>process.exit());
});





