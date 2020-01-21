const db = require('../../database');
var multer = require('multer')
var path = require('path')
var async = require('async');
//var fs = require('fs');
var fs = require('fs-extra'); 
const process = require('process')
const express = require("express");
const Post = require('../../database/UserPost.model');
const User = require('../../database/User.model');
const Like = require('../../database/Like.model');
const Comment = require('../../database/Comment.model');
global.dirName
global.fileName
var postData = []
var commentObj= new Map();

exports.uploadForm = (req, res) => {
	var applicationform = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		file: req.file
	};
	
	// log applicationForm
	console.log(JSON.stringify(applicationform, null, 4));
	
	res.send('Uploaded Successfully!');
}
module.exports.addPostsLikes=  function  (req, res)  {

  console.log(req.body)  
  console.log(req.body.likes)  
  console.log(req.body.postId) 
  console.log(req.body.commentId)  
  var username =req.body.username  
  var set =[];
  set.push(req.body.username)
/*   Like.countDocuments(({username:req.body.username}).then(count=>{
  console.log("========count")
  console.log(count)
})) */
 Like.findOne({postId:req.body.postId}, function(err, doc) {
  console.log("2221Hiiiiiii           inside "+doc);
  if (err) {
    console.log("2221Hiiiiiii");
  }
  if (doc) {
    console.log("2221Hiiiiiii");
    if(!doc.username.includes(req.body.username))
  {  Like.findOneAndUpdate(
      {  postId: req.body.postId}, 
      { $push: { username: req.body.username  },
      likes:req.body.Likes
     },
     function (error, success) {
           if (error) {
               console.log(error);
           } else {
               console.log(success);
           }
       });}

    res.status(200).json({   emailWarning: req.body.email+ ' email  Already exists'});

    return res.end();  
  }
  else{
    like=new Like({
      likes:req.body.Likes,
     postId: req.body.postId/* ===undefined ?Math.floor(Math.random() * Math.floor(989.99)): req.body.postId , 
     commentId: req.body.commentId===undefined ?Math.floor(Math.random() * Math.floor(9888888899.99)): req.body.commentId */, 
    /*  names: [{req.body.username}, */
     username: set}
    
    )
    console.log(like)
     like.save();
  }
  
});
 
 }


module.exports.addPostComment=    (req, res)=> {

 console.log(req.body)  

 console.log(req.body.username)  
 console.log("req.body.comment#################################################")  
 console.log(req.body.comment)  

 comment=new Comment({
    postId: req.body.postId||"" , 
    commentText: req.body.comment || "", 
    userId:req.body.username  || "",
  time:Date.now()}
   )
 
   console.log(req.body)  

   comment.save()
   comment=null

}
module.exports.getPostsfromfollowings=  async  (req, res) => {
var Likesmap
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
  var commnetsObjmap=new Map();
  var commnetsLikesmap=new Map();
 
  console.log("getPostsfromfollowing s=   ===================")  
  var messageData = {
    postText: 
      "---"
    ,
    message: "encoded"
    }
  Post.find( {"username": { "$in":usersslist } } ).exec(  async function(err, posts) {  
        
  
    
    //console.log(user) 
          if (err) {
            //always handle errors here :)
            console.log(err) 
          }
    
        var LikesObj=[]
        
          if (posts) {
            postData=[]
            
            await Promise.all(posts.map(async post => {
           //   listAllcomments (tryMe, post)
             /*  listAllcomments(function(post,err) {
                if (err) return res.sendStatus(500);
                for (var i = 0; i < cmts.length; i++) {
                  console.log("comments      ==================s")
                  console.log(cmts[i])
                }
              }) */
              console.log("comment retrieve for {postId:post._id  start "+post._id ) 

              const response =  await  Comment.find({postId:post._id, commentText: { $ne: null }}).then(
                comment=>{
             /*      for(var eachComment in comment )
                { 
                  Like.find({commentId:comment._id}).then(likes=>{
                    commnetsLikesmap.set(comment._id,likes.likes)
                  })
                } */
                 Likesmap=new Map();
                Like.find({postId:post._id}).then(likes=>{
                  Likesmap.set(comment._id,likes.likes)
                })
                  console.log("Here is push for commnet #############"+post._id)
                  console.log(comment)
                  if(comment.length>0)
                  {
                    console.log("Here is push inside for commnet #############"+post._id)
                    console.log(comment)
                    commnetsObjmap.set(post._id,comment)
                  }
                  console.log("Here printing ======================= ")
                  console.log(commnetsObjmap) 
                  console.log(commnetsObjmap.get(post._id)) 
                }
              )
              console.log("comment retrieve for {postId:post._id end   "+post._id ) 
                  console.log('encoded returning     for commentObj ====    ') 
              //    console.log(comment) 
                
                //  commentObj.push(comment)
             //     console.log('encoded returning 2    for commentObj     ') 
               //   console.log(commentObj) 
                
               
             
                
                  let   filepath= post.postfilePath;
                  console.log(filepath) 
                  console.log(fs.existsSync(filepath)) 
                  if (fs.existsSync(filepath)){
         
                    //  callback1();
            //          console.log('encoded returning     for readfile================== ') 
                      var content= fs.readFileSync(filepath, "base64"); 
                     
                      console.log('encoded returning     for commentObj ====    ')  
                      console.log(commnetsObjmap) 
                      console.log("Here printing 3333333 ======================= "+post._id)
                  console.log(commnetsObjmap) 
                  if(commnetsObjmap.get(post._id)!==undefined)
             {     console.log(commnetsObjmap.get(post._id)) 
                      var messageData = {
                        postText:post.postText,
                        postID:post._id,
                        comments:commnetsObjmap.get(post._id),
                        user:post.username,
                        Likes:null/* Likesmap.get(post._id)!==undefined?Likesmap.get(post._id):undefined */,
                        message: content,
                        time:post.time
                        }
                      }
                      else{
                        var messageData = {
                          postText:post.postText,
                          postID:post._id,
                          comments:[],
                          user:post.username,
                          Likes:LikesObj,
                          message: content,
                          time:post.time
                          }
                      }
                  //      console.log(post._id+" count"+count)
                  console.log("==============================msg");
                //  console.log(messageData);
                        postData.push(messageData)
                        count++;
                //        console.log(post._id+" count"+count)
                      }  
           //   const user =   response;
            console.log("postData");
            console.log(postData.length);
          //  console.log(user);
              console.log("--------------------------------------------b4 postData");
             // return res.status(200).send(postData)
          
           
              
              }))
              console.log("final***************")
            /*   console.log(postData[0].comments)
              console.log("final***************")
              console.log(postData[1].comments)
              console.log("final***************")
              console.log(postData[2].comments)
              console.log("final***************")
              console.log(postData[3].comments) */
              return res.status(200).send(postData)
            console.log("----------------------")
           /*  let requests = post.map((post) => {
              return new Promise((resolve) => {
                myFunction(post, resolve);
              });
          })
          Promise.all(requests).then(() =>
          { console.log('done')
        }); */
        console.log("--------------------------------------------postData");
       
    
          // post .forEach(myFunction2)

            console.log("-----------p-----------")
        //    console.log(postData)
          
        console.log("-------------------------------------------- nulllingpostData");
      
  }
  postData=[]

})
/*     async.forEach(posts, function(post, callback){
  
      console.log("------------mf----------")
   //  console.log(post)
    
     let   filepath= post.postfilePath;
     console.log(filepath) 
     console.log(fs.existsSync(filepath)) 

     if (fs.existsSync(filepath)){
      console.log('encoded returning     for preview '+post._id) 
      var content= fs.readFileSync(filepath, "base64"); 
   
       Comment.find({ postId:post._id}).then(comments=>{
        console.log("comments---------------------------------------------------------------------------------------------------")
        console.log(comments)      
        commnetsObj.push(comments);
      })
      var messageData = {
        postText:post.postText,
        postID:post._id,
        message: content,
        username:post.username,
        comments:commnetsObj,
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
  }) */
  

}


module.exports.addPost =   async  (req, res) => {
 // console.log(req.file)
   console.log("+++++++++++++++ =============== uname ");
/*   await  uploader(req, res, function (err) {
       
  console.log("+++++++++++++++");
  console.log("+++++++++++++++"+err);
       if (err instanceof multer.MulterError) {
           return res.status(500).json(err)f
       } else if (err) {
           return res.status(500).json(err)
       }
       //return res.status(200)
      })   */
    console.log(req.body.username);
console.log(req.body.postText);
 console.log(req.body)  
 postfilePath=dirName+'/'+fileName;

/*  __dirname='../uploads/'
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
} */


  

  try{
//  console.log(req.query.username+"u")

//dirnamePost=dir;

let userId="";
  
     console.log('postfilePath')
     console.log(postfilePath)
     var post
       User.find({"username":req.query.username}).then(user=>{
 post=new Post( {username: req.body.username||"" , 
  postText: req.body.postText || "", 
postfilePath:postfilePath  || "",
 time:Date.now()
 
});

console.log("b4save=======================")  
post.save(
  function (e, data) {

    console.log(data)
console.log("save=======================")
});
})

console.log("saveAfter=======================")  
      fs.readFile(postfilePath,(err, contents)=> {
        if (err) {
        console.log('Error: ', err);
       }else{
        console.log('encoded returning   for previews ') 
      
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

let  count=0;
module.exports.getPostList=    function  (req, res)  {
  console.log("user --------------------")
  let user = req.params.uname;
  console.log("user==============================================================")
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
    
        var LikesObj=[]
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
           
          // Like.find({postId:post._id}).then(likes=>LikesObj.push(likes))
           if (fs.existsSync(filepath)){
           
          //  callback1();
            console.log('encoded returning     for readfile================== ') 
            var content= fs.readFileSync(filepath, "base64"); 

             Comment.find({postId:post._id}).then(comments=>
              {
                console.log('encoded returning     for commentObj     ') 
                console.log(comments) 
                commentObj.push(comments)
                console.log('encoded returning 2    for commentObj     ') 
                console.log(commentObj) 
              }
                )
                
            console.log(commentObj) 
            var messageData = {
              postText:post.postText,
              postID:post._id,
              comments:commentObj,
              Likes:LikesObj,
              message: content,
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
          // post .forEach(myFunction2)

            console.log("-----------p-----------")
        //    console.log(postData)
          
     
  }
})}

module.exports.getPostLikes=    function  (req, res)  {
  console.log("-------get likes from -----*****************-")
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)
  console.log(req.data)
  let postId = req.params.postId;

  Like.find({postId:req.query.postId}/* ,{likes:1,username:1,_id:0,} */).then(response=>{
    return res.status(200).send(response)
  })}
module.exports.getPostList1=    function  (req, res)  {
  console.log("user --------------------")
  let user = req.params.uname;
  console.log("user==============================================================")
  console.log(user)
 
  var messageData = {
    postText: 
      "---"
    ,
    message: "encoded"
    }
    
  Post.find({username:user}).exec(  async function(err, posts) {   
    
    console.log(user) 
          if (err) {
            //always handle errors here :)
            console.log(err) 
          }
    
        var LikesObj=[]
        
          if (posts) {
            postData=[]
            
            await Promise.all(posts.map(async post => {
           //   listAllcomments (tryMe, post)
             /*  listAllcomments(function(post,err) {
                if (err) return res.sendStatus(500);
                for (var i = 0; i < cmts.length; i++) {
                  console.log("comments      ==================s")
                  console.log(cmts[i])
                }
              }) */
              console.log("comment retrieve for {postId:post._id  start "+post._id ) 

              const response =  await  Comment.find({postId:post._id, commentText: { $ne: null }}).then(
                comment=>{
                  console.log("Here is push for commnet #############"+post._id)
                  console.log(comment)
                  if(comment.length>0)
                  {
                    console.log("Here is push inside for commnet #############"+post._id)
                    console.log(comment)
                    commentObj.set(post._id,comment)
                  }
                  console.log("Here printing ======================= ")
                  console.log(commentObj) 
                  console.log(commentObj.get(post._id)) 
                }
              )
              console.log("comment retrieve for {postId:post._id end   "+post._id ) 
                  console.log('encoded returning     for commentObj ====    ') 
              //    console.log(comment) 
                
                //  commentObj.push(comment)
             //     console.log('encoded returning 2    for commentObj     ') 
               //   console.log(commentObj) 
                
               
             
                
                  let   filepath= post.postfilePath;
                  console.log(filepath) 
                  console.log(fs.existsSync(filepath)) 
                  if (fs.existsSync(filepath)){
         
                    //  callback1();
            //          console.log('encoded returning     for readfile================== ') 
                      var content= fs.readFileSync(filepath, "base64"); 
                     
                      console.log('encoded returning     for commentObj ====    ')  
                      console.log(commentObj) 
                      console.log("Here printing 3333333 ======================= "+post._id)
                  console.log(commentObj) 
                  if(commentObj.get(post._id)!==undefined)
             {     console.log(commentObj.get(post._id)) 
                      var messageData = {
                        postText:post.postText,
                        postID:post._id,
                        comments:commentObj.get(post._id),
                        Likes:LikesObj,
                        message: content,
                        time:post.time
                        }
                      }
                      else{
                        var messageData = {
                          postText:post.postText,
                          postID:post._id,
                          comments:[],
                          Likes:LikesObj,
                          message: content,
                          time:post.time
                          }
                      }
                  //      console.log(post._id+" count"+count)
                  console.log("==============================msg");
                  console.log(messageData);
                        postData.push(messageData)
                        count++;
                //        console.log(post._id+" count"+count)
                      }  
           //   const user =   response;
            console.log("postData");
            console.log(postData.length);
          //  console.log(user);
              console.log("--------------------------------------------b4 postData");
             // return res.status(200).send(postData)
          
           
              
              }))
              console.log("final***************")
           /*    console.log(postData[0].comments)
              console.log("final***************")
              console.log(postData[1].comments)
              console.log("final***************")
              console.log(postData[2].comments)
              console.log("final***************")
              console.log(postData[3].comments) */
              return res.status(200).send(postData)
            console.log("----------------------")
           /*  let requests = post.map((post) => {
              return new Promise((resolve) => {
                myFunction(post, resolve);
              });
          })
          Promise.all(requests).then(() =>
          { console.log('done')
        }); */
        console.log("--------------------------------------------postData");
       
    
          // post .forEach(myFunction2)

            console.log("-----------p-----------")
        //    console.log(postData)
          
        console.log("-------------------------------------------- nulllingpostData");
      
  }
  postData=[]

})
postData=[]

}
 




  
var uploader = multer({ storage:storage})
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    dir='./uploads/'+"dir"+req.body.username+'/';
    console.log(req.query+"========= dir  crea  ")
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    callback(null, dirnamePost)
  },
  filename: function(req, file, callback) {
    console.log("file")
 postfilePath=dirnamePost+Date.now()+file.originalname;
    callback(null,Date.now()+file.originalname)
  }
})
var storage = multer.diskStorage({
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
 
var upload = multer({storage: storage});

  function myFunction10(post) {
  console.log("-----------555-mf----------")
 //console.log(post)

 let   filepath= post.postfilePath;
 console.log(filepath) 
 console.log(fs.existsSync(filepath)) 

 if (fs.existsSync(filepath)){
  console.log('encoded returning     for preview ') 
 fs.readFile(filepath,(err, contents)=> {
  console.log('encoded returning     for preview ') 
  //console.log(contents) 
  if (err) {
  console.log('Error: ', err);
 }else{
  console.log('encoded returning   for preview ') 
//  console.log('File contents ',contents);
   encoded = contents.toString('base64')

   var messageData = {
    postText:post.postText+"Heeeeeeeeeeeeeeeeeeeeeeeee",
    
    message: encoded
    }
    postData.push(messageData)
    //console.log(postData)
  //You can access the objectId of the employee like
 
}
})}
//console.log(postData)

this.socket.on('updateUsersList', function (users) {
  console.log(users);
  this.setState({
      users : users
  });
}.bind(this));

}


var x=function (post,callback){
  Comment.find({postId:post._id}).then(comments=>
    {
      console.log('encoded returning     for commentObj     ') 
      console.log(comments) 
      commentObj.push(comments)
      console.log('encoded returning 2    for commentObj     ') 
      console.log(commentObj) 
    }
      )
}

var listAllcomments1 = function (post,cb) {
  Comment.find({postId:post._id}, cb);
};

function tryMe (post) {
 // console.log(param1 + " and " );
 return Comment.find({postId:post._id});
}

function listAllcomments (callback) {
  callback (arguments[1]);

 //Comment.find({postId:post._id}, cb);
}

