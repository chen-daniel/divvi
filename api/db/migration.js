const AppDAO = require('./appDAO');

const dao = new AppDAO('./db/app.db');

const Accounts = require('../src/models/accounts');
const SessionTokens = require('../src/models/sessionTokens');

const accounts = new Accounts(dao);
const sessionTokens = new SessionTokens(dao);

accounts.createTable();
sessionTokens.createTable();

dao.close();
