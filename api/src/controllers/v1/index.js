const accounts = require('./accounts');
const sessions = require('./sessions');

function helloWorld(req, res) {
  res.json({hello: 'world'});
}

module.exports = {
  helloWorld: helloWorld,
  accounts: accounts,
  sessions: sessions
};
