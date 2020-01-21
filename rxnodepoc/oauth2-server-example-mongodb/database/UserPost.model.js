const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  postText:String,
  postfilePath:String,
  username: String, 
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
  comments: [{
    text: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}]

 
});

module.exports = mongoose.model('Post', PostSchema);