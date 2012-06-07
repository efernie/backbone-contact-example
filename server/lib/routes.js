var ENV = process.env['NODE_ENV'] || 'development'
  , config = require('../config')[ENV]
  , _ = require('underscore')
  ;

module.exports = function (app) {

  // Index Page
  app.get('/', function(req, res) {
    res.render('index');
  });


  // All other pages
  app.get('/:page',function(req,res) {

    // View Partial
    res.partial(req.params.page);
  });

}