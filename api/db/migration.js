const AppDAO = require('./appDAO');

const dao = new AppDAO('./db/app.db');

const Accounts = require('../src/models/accounts');
const SessionTokens = require('../src/models/sessionTokens');
const Groups = require('../src/models/groups');
const UsersToGroups = require('../src/models/usersToGroups');

const accounts = new Accounts();
const sessionTokens = new SessionTokens();
const groups = new Groups();
const usersToGroups = new UsersToGroups();

accounts.createTable();
sessionTokens.createTable();
groups.createTable();
usersToGroups.createTable();

dao.close();
