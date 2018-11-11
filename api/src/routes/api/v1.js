const express = require('express');
const router = new express.Router();
const controllers = require('../../controllers');
const middleware = require('../../middleware');
const v1Controller = controllers.v1;

const authentication = middleware.authentication;

router.get('/helloworld', v1Controller.helloWorld);

router
  .route('/sessions')
  .post(v1Controller.sessions.createSession)
  .delete(v1Controller.sessions.deleteSession);

router
  .route('/groups')
  .get(v1Controller.groups.getAllGroups);
  
router
  .route('/groups/:groupsId')
  .get(v1Controller.groups.getGroup)
  .post(v1Controller.groups.createSession)
  .delete(v1Controller.groups.deleteSession);

router
  .route('/userGroups')
  .get(v1Controller.userToGroups.getUserGroup)
  .post(v1Controller.userToGroups.createUserToGroup)

router
  .route('/userGroups/:userGroupId')
  .delete(v1Controller.userToGroups.deleteUserGroup);
  
router
  .route('/groups/:groupsId')
  .get(v1Controller.groups.getGroup)
  .post(v1Controller.groups.createSession)
  .delete(v1Controller.groups.deleteSession);

router
  .route('/accounts')
  .get(v1Controller.accounts.getAllAccounts);

router
  .route('/accounts/:accountId')
  .get(authentication.requireSession, v1Controller.accounts.getAccount)
  .post(v1Controller.accounts.createAccount)
  .put(authentication.requireSession, v1Controller.accounts.updateAccount);

module.exports = router;