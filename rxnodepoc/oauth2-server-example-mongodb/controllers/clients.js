const crypto = require('crypto');
const db = require('../database');

const OAuthClient = db.OAuthClient;

module.exports.createClient = (req, res) => {
  console.log("module.exports.createClient");
  console.log(res+"res  module.exports.createClient req"+req);
  const client = new OAuthClient(req.body);
  client.clientId = crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex'); // 32 chars
  client.clientSecret = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex'); // 64 chars
  client.scope = 'profile';

  client.save()
    .then(() => res.json({ id: client }));
};

module.exports.getClient = (req, res) => {
  OAuthClient.findOne({ name: req.query.name })
    .then((client) => {
      console.log(client+"res  module.exports.getClient");
      res.json(client);
    });
};
