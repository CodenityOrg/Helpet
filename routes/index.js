var index = {};
var indexController = require('../controllers/index'),
	userController = require('../controllers/user'),
	featureController = require('../controllers/feature'),
	postController = require('../controllers/post');

index["/"] = {};
index["/info-losts"] = {};
index["/login"] = {};
index["/user"] = {};
index["/registro"] = {};
index["/post"] = {};
index["/post/one"] = {};
index["/user/preferences"] = {};
index["/mapa"] = {};
index["/post/list/view/type"] = {};
index["/mapa/json"] = {};
index["/publicacion"] = {};
index["/logout"] = {};
index["/post/view"] = {};
index["/post/list/view"] = {};
index["/features/list"] = {};

index["/registro"]["GET"] = indexController.registerView;
index["/publicacion"]["GET"] = indexController.postView;
index["/"]["GET"] = indexController.indexView;
index["/mapa"]["GET"] = indexController.mapView;
index["/mapa/json"]["GET"] = postController.getAllPostForType;

index["/login"]["POST"] = userController.login;
index["/user"]["POST"] = userController.create;
index["/registro"]["POST"] = userController.create;

index["/post/view"]["GET"] = postController.createView;
index["/post/list/view"]["GET"] = postController.postsView;
index["/post/list/view/type"]["GET"] = postController.getAllPostForType;

index["/features/list"]["GET"] = featureController.getForQuery;

index["/post"]["POST"] = postController.create;
index["/post/one"]["GET"] = postController.getOne;
index["/user/preferences"]["POST"] = userController.savePreferences;
index["/logout"]["GET"] = userController.logout;

module.exports = index;
