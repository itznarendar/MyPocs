const oauthMiddlewares = require('./oauthServerMiddlewares');
const usersController = require('./controllers/usersController');
const usersController1 = require('./controllers/usersController.js');
const clientsController = require('./controllers/clients');
var fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer')
var profilepicPathSaved
var reloadify = require('reloadify');
const Post = require('./database/UserPost.model');
const User = require('./database/User.model');
var express = require('express');
var path = require('path');
var dirnamePost;
var postfilePath;
var profile=true;
//var __dirname="./uploadsProfile/"
/* var upload = multer({ storage:storage})
var storage = multer.diskStorage({  
  destination: function (req, file, cb) {
    console.log("1111111111##################");
    console.log(file.originalname);
  cb(null, './uploads/'+req.body.username)
},
filename: function (req, file, cb) {
  console.log("222222222222222############  ######");
  console.log(file.originalname);
  cb(null, Date.now() + '-' +file.originalname )
 
} 
}) */
function initialize(app) {
  // app = express()
  console.log(" initialize   call ");
 // reloadify(app, __dirname + '/views');
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'uploadsProfile')));
  app.all('/oauth/token', oauthMiddlewares.token);

  app.get('/oauth/authorize', oauthMiddlewares.authorize);
  app.post('/oauth/authorize', oauthMiddlewares.authorize);

  app.get('/secure', oauthMiddlewares.authenticate, (req, res) => {
    res.json({ message: 'Secure data' });
  });

  app.post('/users', usersController.createUser);
//app.post('/upload',upload, usersController.uploadImage,function(req, res){});

  app.post('/clients', clientsController.createClient);
  app.get('/clients', clientsController.getClient);
 

    app.post('/upload', async function ( req, res )  { 
    console.log("############ 4 ######");
    console.log(req.file);
    console.log("############ 5 ######");
    console.log(req.body);
    console.log("############ 55 ######");
    //console.log(req);
  
    console.log("++++++++++++++++++++++++++++++++++++++++++");
    await upload(req, res, function (err) {
       
      console.log("+++++++++++++++");
      console.log("+++++++++++++++"+err);
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
         //  console.log(req.file);
           console.log("req.body------------during upload-------------"+req.file.path);
         //  console.log(req.body);
         // console.log( body.buffer.toString("base64"))
      //    res.writeHead(200,{'Content-type':'image/jpg'});
      let encoded="empty";
      fs.readFile(req.file.path,(err, contents)=> {
        if (err) {
        console.log('Error: ', err);
       }else{
        console.log('encoded returning') 
        console.log('File contents ',contents);
         encoded = contents.toString('base64')

         
        console.log(encoded) 
        let objJsonStr = JSON.stringify(contents);
      console.log(objJsonStr)
let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
  console.log(JSON.stringify(encoded))   
  console.log("req.body objJsonB64");
  console.log(objJsonB64)     
  return res.status(200).send(encoded)
       }
      })
      console.log("req.body--- compltedt upload ----------------------"+req.file.path);
      User.findOneAndUpdate({username:req.body.username}, {$set:{profilepicPath:profilepicPathSaved}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });
     
     
     //   User.save( profilepicPath:profilepicPathSaved)
      
    /*   console.log('encoded') 
      console.log(encoded) 
      return res.status(200).send(encoded) */
  
    }) 
  })
  
  /* ===== Add the function to save filename to database ===== */
  
 
  //});  */
 /*   app.post('/upload', (request, response) => {
    console.log(request.body)
    upload(request, response, (err) => { // 'avatar' MUST match <input type="file" name="avatar" />
      if (err) {
        console.log('Error Occured', err);
        response.send(err);
        return;
      }
      console.log(request.file);
      response.end('Your avatar Uploaded');
      console.log('avatar Uploaded');
    })
  });  */
  
  var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
      console.log(req.body.username)
 
       cb(null, './upload/');
      

       }   ,
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        profilepicPathSaved='./upload/'+ file.originalname;
          cb(null,  file.originalname);
      
      
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

/** API path that will upload the files */
/* app.post('/upload', (req, res) =>{
  console.log(req.body)
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
         console.log(req.body);
    });
  
});
  */
 app.get('/getProfileImg/:uname',usersController.getImage);  
 app.post('/sharepost',usersController.addPost);  
 app.get('/getsuggestedToFollow/:uname',usersController.getSuggstedToFollow); 
 app.get('/getfollowingList/:uname',usersController.getfollowingList); 
 app.get('/getfollowersList/:uname',usersController.getfollowersList); 
 app.get('/getPostsfromfollowings/:usersList',  usersController.getPostsfromfollowing);
 app.post('/getPostsfromfollowings/',  usersController.getPostsfromfollowings);
 app.post('/follow/:uname',usersController.startFollow); 
 app.get('/postList/:uname', usersController.getPostList);
 app.post('/addPostComments/',  usersController.addPostComment);
 app.post('/login', (req, res) => {
	dbOps.connectDbAndRunQueries('login', req, res)
})


app.post('/getrooms/:id', (req, res) => {
	dbOps.connectDbAndRunQueries('getRooms', req, res)
})

app.get('/getconversation/:id', (req, res) => {
	dbOps.connectDbAndRunQueries('getConversation', req, res)
})


app.put('/updateroom', (req, res) => {
	dbOps.connectDbAndRunQueries('updateRoom', req, res)
})

app.put('/updateroomreadstatus', (req, res) => {
	dbOps.connectDbAndRunQueries('updateRoomReadStatus', req, res)
})
 /*  app.post('/sharepost', async function ( req, res )  {
  console.log(req.file)
  console.log("+++++++++++++++");
  console.log(req.query)
  try{
  console.log(req.query)
 
dir='./uploads/'+"dir"+req.query.username
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
dirnamePost=dir;

let userId="";
await upload(req, res, function (err) {
       
  console.log("+++++++++++++++");
  console.log("+++++++++++++++"+err);
       if (err instanceof multer.MulterError) {
           return res.status(500).json(err)
       } else if (err) {
           return res.status(500).json(err)
       }
       //return res.status(200)
      })
const post=new Post( {username: req.query.username||"" , 
  postText: req.query.postText || "", 
postfilePath:postfilePath  || "",
 
});
        await post.save(
          function (e, data) {
            console.log(data);
          
          
            res.status(200).json({
                success1: req.body.username+ ' created succesfully'
            }
        );
        //res.json({ id: email });
      
        return res.end();  
      
      })
       
      /*   User.findOne({email:req.body.email}).exec(function(err, user) {    
          if (err) {
            //always handle errors here :)
          }
          if (user) {
            //You can access the objectId of the employee like
            console.log(user._id);
          }
        }) */
      
    
 /*     }
      catch(e) {
        console.log('Error caught'+e);
      }
})  */ 
}  

/*  */


module.exports = initialize;
