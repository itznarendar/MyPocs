

const mongoose = require('mongoose');
const config = require('config');
const OAuthAccessToken = require('./OAuthAccessToken');
const OAuthAuthorizationCode = require('./OAuthAuthorizationCode');
const OAuthClient = require('./OAuthClient');
const OAuthRefreshToken = require('./OAuthRefreshToken');
const Post = require('./UserPost.model.js');
const OAuthScope = require('./OAuthScope');
const User = require('./User.model.js');

mongoose.Promise = Promise;

function connect() {
  mongoose.connect(config.database).then(() => {
    console.log('Mongoose Connected');
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  connect,
  OAuthAccessToken,
  OAuthAuthorizationCode,
  OAuthClient,
  OAuthRefreshToken,
  OAuthScope,
  User,
  Post
};
