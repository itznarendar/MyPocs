const multer = require('multer');
const fs = require('fs');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	/* 	dir='./uploads/'+"dir"+req.body.username+'/';*/
		console.log("========= dir  crea upload dir  ")
		console.log(req.params)
		console.log(req.query)
		console.log("========= dir  crea  upload dir ")
		dirName='./uploads/'+req.query.username
     if (!fs.existsSync(dirName)){
        fs.mkdirSync(dirName);
		}  
		
	  cb(null,   dirName)
	},
	filename: (req, file, cb) => {
	
	fileName=	Date.now()+file.originalname
	console.log(fileName)
    cb(null,fileName)
	}
});
 
var upload = multer({storage: storage});
 
module.exports = upload;