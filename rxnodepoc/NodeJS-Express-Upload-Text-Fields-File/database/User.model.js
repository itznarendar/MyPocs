const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  phone:String,
  firstName:String,
  lastName:String,
  dob:Date,
  project:String,
  department:String,
  technology:String,
  manager:String,
  address:String,
  lastlogin:Date,
  loginfailedattempts: String,
  status: String,
  profilepicPath:String,
  followers:[String],
 
 
});

module.exports = mongoose.model('User', UserSchema);
