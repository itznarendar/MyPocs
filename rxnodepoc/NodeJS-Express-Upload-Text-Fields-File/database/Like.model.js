const mongoose = require('mongoose');
var multer = require('multer')
const Schema = mongoose.Schema;

const LikeSchema = new mongoose.Schema({
    username: {type: Array,dropDups: true }    
    
  /*   names: [/* { username: { type: String, unique: true } } */,
    
    postId:{ type : String , unique : true, dropDups: true },
  /*   commentId:{ type : String , unique : true, dropDups: true }, */
     likes:String

});
LikeSchema.index({  postId: 1 }, { unique: true });
/* LikeSchema.index({ commentId: 1 }, { unique: true }); */
module.exports  = mongoose.model('Like',LikeSchema);



