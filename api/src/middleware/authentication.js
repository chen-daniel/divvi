const appDAO = require('../../db/appDAO');
const SessionTokensModel = require('../models/sessionTokens');
const SessionTokens = new SessionTokensModel();
const moment = require('moment');

async function requireSession(req, res) {
  try {
    const token = req.get('X-Auth-Token');
    const currAccount = req.get('X-Curr-Account');
    const dao = new appDAO('./db/app.db');
    const sessionTokens = new SessionTokens(dao);
    const sessionToken = await sessionTokens.getById(token);
    dao.close();
    if (
      sessionToken.token === token &&
      sessionToken.accountId === currAccount &&
      moment(sessionToken.expiryDate).isAfter(moment())
    ) {
      if (req.get('Device') === 'web') {
        _updateToken(sessionToken);
      }
      return;
    } else {
      throw error;
    }
  } catch (err) {
    return res.status(403).send('Forbidden');
  }
}

async function _updateToken(sessionToken) {
  try {
    const newExpiryDate = moment().add(30, 'm');

    sessionToken.expiryDate = newExpiryDate;
    const dao = new appDAO('./db/app.db');
    const sessionTokens = new SessionTokens(dao);
    const result = await sessionTokens.update(sessionToken);
    dao.close();
    return;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  requireSession: requireSession
};
