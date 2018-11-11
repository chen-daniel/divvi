const accounts = require('./accounts');
const sessions = require('./sessions');
const groups = require('./groups');
const userToGroups = require('./userToGroups');

function helloWorld(req, res) {
  res.json({hello: 'world'});
}

module.exports = {
  helloWorld: helloWorld,
  accounts: accounts,
  sessions: sessions,
  groups: groups,
  userToGroups: userToGroups
};
