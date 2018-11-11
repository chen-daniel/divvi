const AccountsModel = require('../../models/accounts');
const Accounts = new AccountsModel();
const _ = require('lodash');
const bcrypt = require('bcrypt');

async function createAccount(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const accountParams = _.pick(json, [
      'username',
      'password',
      'fullName',
      'email'
    ]);
    const hash = await bcrypt.hashSync(accountParams.password, 5);
    accountParams.password = hash;
    const result = await Accounts.create(
      accountParams.username,
      accountParams.password,
      accountParams.fullName,
      accountParams.email
    );
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function getAccount(req, res) {
  try {
    const result = await Accounts.getById(req.params.accountId);
    delete result.password;
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function updateAccount(req, res) {
  try {
    const account = _.pick(req.body, [
      'username',
      'password',
      'fullName',
      'email'
    ]);
    const result = await Accounts.update(account);
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function getAllAccounts(req, res) {
  try {
    const result = await Accounts.getAll();
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Failed');
  }
}

module.exports = {
  createAccount: createAccount,
  getAccount: getAccount,
  getAllAccounts: getAllAccounts,
  updateAccount: updateAccount
};
