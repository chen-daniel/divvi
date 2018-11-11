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
  .get(v1Controller.groups.getAllGroups)
  .post(authentication.requireSession, v1Controller.groups.createGroup);

  
router
  .route('/groups/:groupsId')
  .get(v1Controller.groups.getGroup)
  .delete(v1Controller.groups.deleteGroup);

// needs to find out how to do entire update, get by group id kinda mess things up
router
  .route('/groups/:groupId/receipts')
  .get(authentication.requireSession, v1Controller.receipts.getReceiptByGroup)
  .post(authentication.requireSession, v1Controller.receipts.createReceipt)
  .delete(v1Controller.receipts.deleteReceipt)
  .put(v1Controller.receipts.personPay) 

router
  .route('/requests')
  .post(v1Controller.requests.createRequest)

router
  .route('/requests/:requestId')
  .get(v1Controller.requests.getRequest)
  .delete(v1Controller.requests.removeRequest)

router
  .route('/userGroups')
  .get(v1Controller.userToGroups.getUserGroup)
  .post(v1Controller.userToGroups.createUserToGroup)

router
  .route('/userGroups/:userGroupId')
  .delete(v1Controller.userToGroups.deleteUserGroup);

router
  .route('/accounts')
  .get(v1Controller.accounts.getAllAccounts);

router
  .route('/accounts/:accountId')
  .get(authentication.requireSession, v1Controller.accounts.getAccount)
  .post(v1Controller.accounts.createAccount)
  .put(authentication.requireSession, v1Controller.accounts.updateAccount);

router
  .route('/accounts/:accountId/groups')
  .get(authentication.requireSession, v1Controller.groups.getGroupsForAccount);

module.exports = router;