var multer = require('multer')
const cors = require('cors');
const bodyParser = require('body-parser');
global.postfilePath;
global.dir;
global.fileName;
module.exports = (app, router, upload) => {
	
	const controllers = require('../controllers/application.controller.js');
	var path = __basedir + '/views/';
	
	router.use((req,res,next) => {
		console.log("/" + req.method);
		next();
	});
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.get('/postList/:uname', controllers.getPostList1);
	/* app.get('/', (req,res) => {
		res.sendFile(path + "index.html");
	}); */
urlParser=	bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json();
	app.post('/api/upload/application', upload.single("file"), controllers.uploadForm);

	app.post('/getPostsfromfollowings/',  controllers.getPostsfromfollowings);
	app.post('/addPostComments/',  controllers.addPostComment);
/* 	app.post('/addPostComments/', function(req, res) {
		if(!req.body || req.body.length === 0) {
		  console.log('request body not found');
		  return res.sendStatus(400);
		}
		var user = req.body;
		console.log('request body : ' + JSON.stringify(user));
		console.log(req.body);
		}); */
	
	app.post('/addPostLikes/',  controllers.addPostsLikes);
	app.get('/getPostLikes/',  controllers.	getPostLikes);

app.post('/sharepost', upload.single("file"),controllers.addPost);
 
	app.use('/',router);
 
	app.use('*', (req,res) => {
		res.sendFile(path + "404.html");
	});



 
	app.use('/',router);
 
	app.use('*', (req,res) => {
		res.sendFile(path + "404.html");
	});


}
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
	  callback(null, dirnamePost)
	},
	filename: function(req, file, callback) {
	  console.log(file)
   postfilePath=dirnamePost+Date.now()+file.originalname;
	  callback(null,Date.now()+file.originalname)
	}
  })