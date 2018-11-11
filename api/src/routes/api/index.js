const express = require('express');
const router = new express.Router();
const api = {
  v1: require('./v1')
}
router.use('/v1', api.v1);

module.exports = router;