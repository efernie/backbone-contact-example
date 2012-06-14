var ENV = process.env['NODE_ENV'] || 'development'
  , config = require('../config')[ENV]
  , _ = require('underscore')
  ;

var sampleData = {
  email : 'test@test.com',
  firstName : 'fern',
  lastName : 'fernberg'
};

module.exports = function (app) {

  app.get('/data/sampledata', function (req, res) {
    res.send(sampleData);
  });

  // Index Page
  app.get('/', function (req, res) {
    res.render('index');
  });


  // All other pages
  app.get('/:page', function (req, res) {

    // View Partial
    res.partial(req.params.page);
  });

};