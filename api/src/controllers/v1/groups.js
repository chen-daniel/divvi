const GroupModel = require('../../models/groups');

const Groups = new GroupModel();

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
    const result = await Groups.create(json.name);
    return res.json(result);
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

module.exports = {
    getAllGroups: getAllGroups,
    getGroup: getGroup,
    createGroup: createGroup,
    deleteGroup: deleteGroup
};
