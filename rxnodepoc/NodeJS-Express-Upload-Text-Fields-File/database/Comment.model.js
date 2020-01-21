const mongoose = require('mongoose');
var multer = require('multer')
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
   
    userId:String,
    postId:String,
   commentText:String,
  time:Date

});

module.exports  = mongoose.model('Comment',CommentSchema);



