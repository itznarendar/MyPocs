const mongoose = require('mongoose');
var multer = require('multer')
const Schema = mongoose.Schema;

const CommnetsLikeSchema = new mongoose.Schema({
    names: [/* { username: { type: String, unique: true } } */],
    
  /*   postId:{ type : String , unique : true, dropDups: true }, */
   commentId:{ type : String , unique : true, dropDups: true }, 
     likes:String

});
/* LikeSchema.index({  postId: 1 }, { unique: true }); */
 CommnetsLikeSchema.index({ commentId: 1 }, { unique: true }); 
module.exports  = mongoose.model('Like',CommnetsLikeSchema);



