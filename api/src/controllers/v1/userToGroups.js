const GroupModel = require('../../models/userToGroups');

const UserToGroups = new UserToGroups();

async function createUserToGroup(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const result = await UserToGroups.create(json.userId, json.groupId);
    return res.json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function getUserGroup(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const result = await UserToGroups.getAllGroupsForUser(json.userId);
    return res.json(result);
  } catch (err) {
    return res.status(400).send('User Bad Request');
  }


}

async function deleteUserGroup(req, res) {
  try {
    const result = await UserToGroups.delete(req.params.userGroupId);
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }
}

module.exports = {
  getUserGroup: getUserGroup,
  createUserToGroup: createUserToGroup,
  deleteUserGroup: deleteUserGroup
};
