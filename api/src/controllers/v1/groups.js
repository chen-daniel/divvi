const GroupModel = require('../../models/groups');
const UserToGroupModel = require('../../models/usersToGroups');

const Groups = new GroupModel();
const UserToGroup = new UserToGroupModel();

async function getGroup(req, res) {
  try {
    const result = await Groups.getById(req.params.groupsId);
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function getAllGroups(req, res) {
  try {
    const result = await Groups.getAll();
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function createGroup(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const response = await Groups.create(json);
    await UserToGroup.create(req.get('X-Curr-Account'), response.id);
    const allGroups = await Groups.getAllForAccount(req.get('X-Curr-Account'));
    return res.json(allGroups);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function deleteGroup(req, res) {
  try {
    const result = await Groups.delete(req.params.groupsId);
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }
}

async function getGroupsForAccount(req, res) {
  try {
    if (req.params.accountId !== req.get('X-Curr-Account')) {
      throw new Error('Not your account');
    }
    const result = await Groups.getAllForAccount(req.params.accountId);
    return res.json(result);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }
}

module.exports = {
  getAllGroups: getAllGroups,
  getGroup: getGroup,
  createGroup: createGroup,
  deleteGroup: deleteGroup,
  getGroupsForAccount: getGroupsForAccount
};
