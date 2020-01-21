const mongoose = require('mongoose');
var multer = require('multer')
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  postText:String,
  postfilePath:String,
  username: String, 
time:Date,
postedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
comments: [{
  text: String,
  postedBy: {
     username:String
  }
}]
/* Likes:
 
 { LikedBy: {
     username:String
  }
}] */
 
});

module.exports  = mongoose.model('Post', PostSchema);