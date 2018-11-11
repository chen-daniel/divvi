const RequestsModel = require('../../models/requests');
const Requests = new RequestsModel();

async function createRequest(req, res) {
    try {
      const json = JSON.parse(req.body.json);
      const requestsParam = _.pick(json, [
        'requester',
        'requestee',
        'amount',
        'paid',
        'receipt'
      ]);
      const result = await Requests.create(requestsParam);
      return res.json(result);
    } catch (err) {
      return res.sendStatus(400);
    }
}

async function getRequest(req, res) {
    try {
      const result = await Requests.getById(req.params.requestId);
      return res.json(result);
    } catch (err) {
      return res.sendStatus(400);
    }
}

async function removeRequest(req, res) {
    try {
        const result = await Requests.delete(req.params.requestId);
        return res.json(result);
    } catch (err) {
        return res.sendStatus(400);
    }
}


module.exports = {
    createRequest: createRequest,
    getRequest: getRequest,
    removeRequest, removeRequest
};