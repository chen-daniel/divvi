const AppDAO = require('./appDAO');

const Accounts = require('../src/models/accounts');
const SessionTokens = require('../src/models/sessionTokens');
const Groups = require('../src/models/groups');
const UsersToGroups = require('../src/models/usersToGroups');
const Receipts = require('../src/models/receipts');

const accounts = new Accounts();
const sessionTokens = new SessionTokens();
const groups = new Groups();
const usersToGroups = new UsersToGroups();
const receipts = new Receipts();

async function migrate() {
  await accounts.createTable();
  await sessionTokens.createTable();
  await groups.createTable();
  await usersToGroups.createTable();
  await receipts.createTable();
}

migrate();