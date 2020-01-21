const db = require('../database');
var multer = require('multer')
var path = require('path')
//var fs = require('fs');
var fs = require('fs-extra'); 
const process = require('process')
const express = require("express");
var async = require('async');
let dirnamePost;
let postfilePath;
let followedList=[]
let usersList=[]
var postData = []
var followingData=[]
//const User = db.User;
//const User = require('../database/User');
const User = require('../database/User.model');
const Post = require('../database/UserPost.model');
module.exports.createUser = async (req, res,callback) => {
  try{
  console.log(req.body);
  if(!req.body.email) {
    return res.status(400).send({
        message: " email can not be empty"
    });
}
/* if(!req.body.phone) {
  return res.status(400).send({
      message: " phone no. can not be empty"
  });
}
 */
  const user = new User( {username: req.body.email || "Untitled Note", 
  firstName: req.body.firstname || "StockingLocationID Note", 
  lastName: req.body.lastname || "Untitled PartCondition Note", 
   phone: req.body.phone || "",
   password: req.body.password || "Untitled Note",  
   profilepicPath:"",
   followers:[]
});
console.log("11Hiiiiiii"+User);
 const emailCount=0; 

 await User.findOne({email:req.body.email}, function(err, doc) {
  console.log("2221Hiiiiiii           inside "+doc);
  if (err) {
    console.log("2221Hiiiiiii");
  }
  if (doc) {
    console.log("2221Hiiiiiii");
    res.status(200).json({   emailWarning: req.body.email+ ' email  Already exists'});

    return res.end();  
  }
  
});
await User.findOne({phone:req.body.phone}, function(err, doc) {
 
  if (err) {
  
  }
  if (doc) {
  
    res.status(200).json({  phoneWarning: req.body.phone+ '  phone number  Already exists'});
 
    return res.end(); 
  }
  
});
 /* await User.find({"email":req.body.email}).countDocuments( function (e, count) {
   emailCount=count;
 }); */


 console.log("2221Hiiiiiii");
 console.log(emailCount);
 if(emailCount>1)
 {
  res.status(200).json({   emailWarning: req.body.email+ 'email  Already exists'});

 return res.end();  
 }

 const phonecount=0;

 /* await User.find({"phone":req.body.phone}).countDocuments( function (e, count) {
  phonecount=count;}
); */

 
  if(phonecount>1)
 {
 res.status(200).json({  phoneWarning: req.body.phone+ ' phone Already exists'});
 
 return res.end(); 
 }

  await user.save(
    function (e, data) {
      console.log(data);
      /* createSocket = (user) => {
        let cur_user = users[user.uid],
            // update existing user socket
            updated_user = {
                [user.uid] : Object.assign(cur_user, {sockets : [...cur_user.sockets, user.socket_id]})
            };
        users = Object.assign(users, updated_user);
    };
     
    createUser = (user) => {
        users = Object.assign({
            // create a new user on users object with uid
            [user.uid] : {
                username : user.username,
                uid : user.uid,
                sockets : [user.socket_id]
            }
        }, users);
    }; */
    
      res.status(200).json({
          success1: req.body.email+ ' created succesfully'
      }
  );
  //res.json({ id: email });

  return res.end();  

});
  }
  catch(e) {
    console.log('Error caught'+e);
  }
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
/* 
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req);
      console.log(file);
    cb(null, 'resources')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
}) */





module.exports.addPostComment = async (req, res)=>{
  console.log("req.body=======================================================================");
    console.log(req.body);
  }


module.exports.getImage = async (req, res,callback)=>{
  
  console.log(req.file);
   let user = req.params.uname
   filename=user+'.jpg'
   dirname='./uploadsProfile/'
    console.log(user);
    fs.readdirSync('./uploadsProfile/').forEach(file => {
      console.log(filename+file);
      if(filename===file){
      fs.readFile(dirname+filename,(err, contents)=> {
        if (err) {
        console.log('Error: ', err);
       }else{
        console.log('encoded returning') 
        console.log('File contents ',contents);
         encoded = contents.toString('base64')

         
       // console.log(encoded) 
        let objJsonStr = JSON.stringify(contents);
    //  console.log(objJsonStr)
let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
  console.log(JSON.stringify(encoded))   
  console.log("req.body objJsonB64");
 // console.log(objJsonB64)     
  return res.status(200).send(encoded)
      console.log(file);
    }
    return res.status(200).send("error :"+err)
  }); 
    
    
    console.log(user);
    /* fs.readdirAsync = function(dirname) {
      console.log(user);
      return new Promise(function(resolve, reject) {
          fs.readdir(dirname, function(err, filename){
              if (err) 
                  reject(err); 
              else 
              {
                console.log(filename)
                fs.readFile(filename,(err, contents)=> {
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
                });
                  resolve(filename);
                  
                }
          });
      });
    } */
    console.log(user);
    return ;
 /*  fs.readdir('./uploads/', function(err, items) {
      console.log(items);
   
      for (var i=0; i<items.length; i++) {
        if((items[i].includes(user))
        {

        }
          console.log(items[i]);
      }
  });
     
    return res.send(user) */
  
 
  }
})
};
module.exports.getPostList=    function  (req, res)  {
  console.log("user --------------------")
  let user = req.params.uname;
  console.log(user)
 
  var messageData = {
    postText: 
      "---"
    ,
    message: "encoded"
    }
    
  Post.find({username:user}).exec(  function(err, posts) {   
    console.log(user) 
          if (err) {
            //always handle errors here :)
            console.log(err) 
          }
          if (posts) {
            console.log("----------------------")
           /*  let requests = post.map((post) => {
              return new Promise((resolve) => {
                myFunction(post, resolve);
              });
          })
          Promise.all(requests).then(() =>
          { console.log('done')
        }); */
        async.forEach(posts, function(post, callback){
        
            console.log("------------mf----------")
         //  console.log(post)
          
           let   filepath= post.postfilePath;
           console.log(filepath) 
           console.log(fs.existsSync(filepath)) 
      
           if (fs.existsSync(filepath)){
            console.log('encoded returning     for preview ') 
            var content= fs.readFileSync(filepath, "base64"); 
            var messageData = {
              postText:post.postText,
              postID:post._id,
              message: content,
              time:post.time
              }
              
        //      console.log(post._id+" count"+count)
              postData.push(messageData)
            //  count++;
         //     console.log(post._id+" count"+count)
            }
       //       console.log(messageData) 
         /*   fs.readFile(filepath,(err, contents)=> {
            console.log('encoded returning     for preview ') 
            //console.log(contents) 
            if (err) {
            console.log('Error: ', err);
           }else{
            console.log('encoded returning   for preview ') 
          //  console.log('File contents ',contents);
             encoded = contents.toString('base64')
          
             var messageData = {
              postText:post.postText,
              
              message: encoded
              }
              postData.push(messageData)
              //console.log(postData)
            //You can access the objectId of the employee like
           
          }
          })}  */
          //console.log(postData)
          
          
          
         
            callback();
        
       //   callback(); //notify that this iteration is complete
      }, function(err){
       if(err){throw err;}
       console.log("processing all elements completed");
    // console.log(postData);
       console.log("processing all elements completed");
       return res.status(200).send(postData)
      });
      postData=[]
          // post .forEach(myFunction2)

            console.log("-----------p-----------")
        //    console.log(postData)
          
     
  }
})}
module.exports.addPost =   async (req, res,callback) => {
 // console.log(req.file)
  console.log("+++++++++++++++ =============== uname ");
  console.log(req.body.username);
console.log(req.body.postText);
 console.log(req.body)
 
  try{
//  console.log(req.query.username+"u")
 
dir='./uploads/'+"dir"+req.query.username+'/'
console.log(req.query+"========= dir  crea  ")
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
   //   console.log(postfilePath)
   var post
 await  User.find({"username":req.query.username}).then(user=>{
 post=new Post( {username: req.query.username||"" , 
  postText: req.query.postText || "", 
postfilePath:postfilePath  || "",
postedBy:user._id , 
comments:[]
})});
        await post.save(
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
 // console.log(objJsonB64)     
  return res.status(200).send(encoded)
       }
      });
       
      /*   User.findOne({email:req.body.email}).exec(function(err, user) {    
          if (err) {
            //always handle errors here :)
          }
          if (user) {
            //You can access the objectId of the employee like
            console.log(user._id);
          }
        }) */
      
    
    }
      catch(e) {
        console.log('Error caught'+e);
      }
}
module.exports.getSuggstedToFollow= function  (req,res){

 //let  usersList=userList

  followedList.push(req.params.uname)
 console.log("user find ####################")
  console.log(followedList);
  
   User.find( /* { "username":{ "$nin": followedList}  }*/).exec(  function(err, users) { 
     
  /* User.findOne({}).exec(function(err, user) { */    
    if (err) {
      //always handle errors here :)
    }

    async.forEach(users, function(user, callback){


    console.log("user find ####################")
  
      console.log("user find not null check ####################")
    
      //You can access the objectId of the employee like
      console.log(user);
 
        console.log(user.profilepicPath!==undefined+"userpath check ####################"+user.username+"  pic     "+user.profilepicPath)
        console.log(user.profilepicPath+"user profilepicPath find not null ######                    ##############"+user.username)
        var content="";
        if (fs.existsSync(user.profilepicPath)){
           console.log(content);
           content= fs.readFileSync(user.profilepicPath, "base64"); 
          console.log(content);
          console.log("user details b4 =========="+ user.profilepicPath);
            user.profilepicPath=content
            console.log("user details after"+ user.profilepicPath);
            usersList.push(user)
            
        //    console.log(post._id+" count"+count)
   /*   await    fs.readFile(user.profilepicPath,(err, contents)=> {
          if (err) {
          console.log('Error: ', err);
         }else{
          console.log('follow    for preview ++++============= '+  userobj.profilepicPath)
          console.log( userobj)  
        //  console.log('File contents ',contents);
        var   encoded = contents.toString('base64')
  
        console.log(userobj.profilepicPath!==undefined+"userpath check ####################")
        console.log(userobj.username+"  pic    path    "+userobj.profilepicPath)
        if(userobj.profilepicPath!==undefined)
        {
  userobj.profilepicPath=encoded}
  console.log('follow returning   for before push ++++============= '+  userobj.profilepicPath)
  console.log(userobj) 
  usersList.push(userobj)
         }
        });
        usersList.push(user) */
      }
      content="";
      callback();}
      ,function(err){
        if(err){throw err;}
        console.log("processing all elements completed");
     // console.log(postData);
        console.log("processing all elements completed");
        return res.status(200).send(usersList)
       });
       usersList=[]
     //usersList.push(userobj)
     // usersList.push(user.profilepicPath)
    })}
    module.exports.getfollowersList= function  (req,res){
      console.log("req.params")
      console.log(req.params)
      User.find( {"username":req.params.uname} ,{"followers":1,_id:0,} ).then(response=>
        {
          return res.status(200).send(response)
        })
      }

    module.exports.getfollowingList= function  (req,res){
      
      User.find( {"followers":req.params.uname}/* ,{"username":1,_id:0,} */).then(response=>
        {
          return res.status(200).send(response)
        })
    /*   .exec(  function(err, users) {  
        async.forEach(users, function(user, callback){
        let   filepath= user.profilepicPath;
        console.log(filepath) 
        console.log(fs.existsSync(filepath)) 
   
        if (fs.existsSync(filepath)){
         console.log('encoded returning     for preview ') 
         var content= fs.readFileSync(filepath, "base64"); 
         var messageData = {           
           profilepic: content,
           username:user.username,      
           }
           
       //    console.log(post._id+" count"+count)
           followingData.push(messageData)
      /*      count++;
           console.log(post._id+" count"+count) 
         }     
               
       
      
         callback();
     
    //   callback(); //notify that this iteration is complete
   }, function(err){
    if(err){throw err;}
    console.log("processing all elements completed");
   // console.log(postData);
    console.log("processing all elements completed");
    return res.status(200).send(postData)
   });
   followingData=[]
   //     return res.status(200).send(response);
     }) */
      
  
     
    }
  
    module.exports.startFollow= function  (req,res){

 console.log(req.body.followingUser)
 console.log(req.params)
 console.log(req.query)
/*  Model.findOneAndUpdate({  "username":req.body.followingUser},
  { 'article.hashtag': { '$ne': 'foo' } }, 
  { '$addToSet': { 'article': data } }
) */
 /* User.findOneAndUpdate({  "username":req.body.followingUser},  {$addToSet: 
  {"followers" : {"user":req.params.uname}}},/* { "$push": { "users": userInfo } },  callback, (err, info) => {
  if (err) {
    console.log(err);
  } else {
      if (info) {
        console.log(info)
          resolve();
      } else {
        //console.log(users.followers);
      }
  }
}); */
User.findOneAndUpdate(
  {  "username": req.body.followingUser}, 
  { $push: { followers: req.params.uname  } },
 function (error, success) {
       if (error) {
           console.log(error);
       } else {
           console.log(success);
       }
   });


/* User.update(
  { "username":req.body.followingUser }, 
  { $push: { followers: req.params.uname }} ,callback, (err,info)=>{
    if (err) {
      console.log(err);
    } else {
        if (info) {
          console.log(info)
            resolve();
        } else {
          //console.log(users.followers);
        }
      }
    }
  
); */
/*  User.find( { "username":req.body.followingUser }).exec(  function(err, user) { 
  console.log("user.followers");
  console.log(user);
  
 /*  user.update(
    { 'user.followers': { '$ne': req.params.uname } }, 
    { '$addToSet': { 'article': data } }
)
 user.followers(req.params.uname)
 console.log(users.followers);
 async.forEach(users, function(user, callback){
  console.log(users.followers);
 }) 
         })  */
        }


        module.exports.getPostsfromfollowing=  async  (req, res) => {
          console.log("getPostsfromfollowing ====================")  
          console.log(req.params)  
          console.log(req.query)  
          
       
       }

       module.exports.getPostsfromfollowings=  async  (req, res) => {

        console.log("getPostsfromfollowing s444444====================")  
      /*    console.log(req.params)  
        console.log(req.query.usersList) ;   */
        console.log(req.body)  
        console.log(req.body.followingList) 
        console.log(req.body.followingList.username) 
        var usersslist=[]
        var followingListarray=req.body.followingList
        for(var i=0;i<followingListarray.length;i++)
        {
         console.log( followingListarray[i].username)
         usersslist.push( followingListarray[i].username)
        }
        console.log(usersslist) 
        console.log("getPostsfromfollowing s=   ===================")  
        Post.find( {"username": { "$in":usersslist } } ).exec(  function(err, posts) {  
          
          async.forEach(posts, function(post, callback){
        
            console.log("------------mf----------")
         //  console.log(post)
          
           let   filepath= post.postfilePath;
           console.log(filepath) 
           console.log(fs.existsSync(filepath)) 
      
           if (fs.existsSync(filepath)){
            console.log('encoded returning     for preview ') 
            var content= fs.readFileSync(filepath, "base64"); 
            
            var messageData = {
              postText:post.postText,
              postID:post._id,
              message: content,
              username:post.username,
              time:post.time
              }
              
              console.log(post._id+" count"+count)
              postData.push(messageData)
              count++;
              console.log(post._id+" count"+count)
            }     
                  
          
         
            callback();
        
       //   callback(); //notify that this iteration is complete
      }, function(err){
       if(err){throw err;}
       console.log("processing all elements completed");
      // console.log(postData);
       console.log("processing all elements completed");
       return res.status(200).send(postData)
      });
      postData=[]
      //     return res.status(200).send(response);
        })
        
      
      }

var upload = multer({ storage: storage }).single('file')


module.exports.uploadImage =
  (req, res,next) =>{    
    console.log("Node ######################")    
    console.log(err)    
    upload(req, res, function (err) {
      console.log(err)
    if (err instanceof multer.MulterError) {
      console.log(err)
      return res.status(500).json(err)
    } else if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  
  })
  }





