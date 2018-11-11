const SessionTokensModel = require('../../models/sessionTokens');
const SessionTokens = new SessionTokensModel();
const AuthenticateService = require('../../services/authenticateService');
const _ = require('lodash');
const moment = require('moment');

async function createSession(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const accountId = await AuthenticateService.authenticateLogin(
      json.username,
      json.password
    );
    let expiryDate;
    if (req.get('Device') === 'web') {
      expiryDate = moment().add(30, 'm');
    } else {
      expiryDate = moment().add(5, 'y');
    }
    const token = Math.random()
      .toString(36)
      .substr(2, 9);
    const result = await SessionTokens.create(accountId, token, expiryDate);
    return res.json({ token: token, accountId: accountId });
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function deleteSession(req, res) {
  try {
    sessionToken = req.get('X-Auth-Token');
    const result = await SessionTokens.delete(sessionToken);
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }
}

module.exports = {
  createSession: createSession,
  deleteSession: deleteSession
};
