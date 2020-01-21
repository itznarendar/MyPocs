const util = require("util");

const multer = require('multer');

class Uploader {

    constructor() {		
        console.log("constructor")
		
        var   storage = multer.diskStorage({
            destination: (req, file, cb) => {
            /* 	dir='./uploads/'+"dir"+req.body.username+'/';
            console.log("========= dir  crea  ")
              if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            } */
              cb(null,   './uploads/')
            },
            filename: (req, file, cb) => {
            
            fileName=	Date.now()+file.originalname
            console.log(fileName)
            cb(null,fileName)
            }
        });
         
      var   upload = multer({storage: storage});
    }

    /*  storageOptions = multer.diskStorage({
        destination: (req, file, cb) => {
        /* 	dir='./uploads/'+"dir"+req.body.username+'/';
        console.log("========= dir  crea  ")
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        } 
          cb(null,   './uploads/')
        },
        filename: (req, file, cb) => {
        
        fileName=	Date.now()+file.originalname
        console.log(fileName)
        cb(null,fileName)
        }
    }); 

    upload = multer({ storage: storageOptions });*/
    async startUpload(req, res) {
      
		let filename;
  
		try {
            console.log(" try req.body.username");
		//	const upload = util.promisify(this.upload.any());
            console.log(" try req.body.username");
			await upload(req, res).single('file');
			console.log(req.body.username);
console.log(req.body.postText);
 console.log(req.body) 
 postfilePath='../uploads/' +"dir"+req.body.username + '/' + fileName;
 __dirname='../uploads/'
 dir='../uploads/'+"dir"+req.body.username;
 console.log(dir) 
 if (!fs.existsSync(dir)){
await  fs.mkdir( __dirname + "dir"+req.body.username, err => {})
 // fs.mkdirSync(dir);
}
try {
  if (fs.existsSync(path)) {
    console.log("==========================") 
    fs.move('../uploads/' + fileName, '../uploads/' +"dir"+req.body.username + '/' + fileName, function (err) {
      if (err) {
          return console.error(err);
      }
  });
} }catch(err) {
  console.error(err)
}


  

  try{
//  console.log(req.query.username+"u")

//dirnamePost=dir;

let userId="";
  
     console.log('postfilePath')
     console.log(postfilePath)
const post=new Post( {username: req.body.username||"" , 
  postText: req.body.postText || "", 
postfilePath:postfilePath  || "",
 
});
         post.save(
          function (e, data) {
     //       console.log(data);
          
          
          /*   res.status(200).json({
                success1: req.body.username+ ' created succesfully'
            }
        ); */

        
        //res.json({ id: email });
      
      //  return res.end();  
      
      })
      fs.readFile(req.file.path,(err, contents)=> {
        if (err) {
        console.log('Error: ', err);
       }else{
        console.log('encoded returning   for preview ') 
      //  console.log('File contents ',contents);
         encoded = contents.toString('base64')

         
    //    console.log(encoded) 
        let objJsonStr = JSON.stringify(contents);
 //     console.log(objJsonStr)
let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
 // console.log(JSON.stringify(encoded))   
  console.log("req.body objJsonB64");
  let response
 // console.log(objJsonB64)  
//res.attachment(postfilePath);
 var messageData = {
  postText: 
     req.body.postText
  ,
  message: encoded
  }

 //res.append(req.body.postText)   
  return res.status(200).send(messageData)
	   }
	})
  
		//	filename = req.files[0].filename;
	
  }
  catch(err){

  }
}
catch(err)


{

}


}
}
module.exports = Uploader;