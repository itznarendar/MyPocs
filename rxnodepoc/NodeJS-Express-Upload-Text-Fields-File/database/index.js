const mongoose = require('mongoose');
//const config = require('../config');
//const Post = require('../database/UserPost.model');
mongoose.Promise = Promise;

var mongoDB = 'mongodb://localhost:27017/emp';
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



/* function connect() {
  mongoose.connect(config.database).then(() => {
    console.log('Mongoose Connected');
  }).catch((err) => {
    console.log(err);
  });
} */
/* 
module.exports = {
  connect,

  Post
}; */
