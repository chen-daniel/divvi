const AccountsModel = require('../models/accounts');
const Accounts = new AccountsModel();
const bcrypt = require('bcrypt');

async function authenticateLogin(username, password) {
  try {
    const account = await Accounts.getByUsername(username);
    if (account && account.password) {
      const match = await bcrypt.compareSync(password, account.password);
      if (match) {
        return account.id;
      }
    }
    throw new Error('Could not find username');
  } catch (err) {
    throw err;
  }
}

module.exports = {
  authenticateLogin: authenticateLogin
};
