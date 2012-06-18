var ENV = process.env['NODE_ENV'] || 'development'
  , config = require('../config')[ENV]
  , _ = require('underscore')
  ;

var sampleData = [
  { person : {
    email : 'test@test.com',
    firstName : 'fern',
    lastName : 'fernberg'
  } },
  { person : {
    email : 'test2@test.com',
    firstName : 'arnold',
    lastName : 'schwarzenegger'
  } }
];

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