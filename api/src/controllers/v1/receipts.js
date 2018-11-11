const receiptsModel = require('../../models/receipts');
const Receipts = new receiptsModel();

async function getReceiptByGroup(req, res) {
  try {
    const result = await Receipts.getReceiptsByGroupId(req.params.groupId);
    return res.json(result);
  } catch (err) {
    return res.sendStatus(400);
  }
}

async function createReceipt(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const information = _.pick(json, [
      'groupId',
      'ownerId',
      'description',
      'receipt',
      'type',
      'status'
    ]);
    const result = await Receipts.create(information);
    return res.json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function updateReceipt(req, res) {
  try {
    const id = req.params.receiptId;
    const json = JSON.parse(req.body.json);
    const information = _.pick(json, [
      'groupId',
      'ownerId',
      'description',
      'receipt',
      'type',
      'status'
    ]);
    const result = await Receipts.update(id, information);
    return res.json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function deleteReceipt(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const result = await Receipts.delete(json.id, json.userId);
    return res.json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

async function personPay(req, res) {
  try {
    const json = JSON.parse(req.body.json);
    const result = await Receipts.personPay(json.id, json.userId, json.indexes);
    return res.json(result);
  } catch (err) {
    return res.status(400).send(err);
  }
}

module.exports = {
  getReceiptByGroup: getReceiptByGroup,
  createReceipt: createReceipt,
  updateReceipt: updateReceipt,
  personPay: personPay,
  deleteReceipt: deleteReceipt
};
