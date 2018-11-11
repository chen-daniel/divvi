const api = require('./api');

module.exports = function(app) {
  app.use('/api', api);
  app.use(function(req, res) {
    res.sendStatus(404);
  })
}