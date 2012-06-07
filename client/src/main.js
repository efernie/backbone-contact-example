require([
  'fernsworld',
  // Libs
  'jquery',
  'underscore',
  'backbone',

  // Views
  'views/views'

  ],

  function( FernsWorld, $, _, Backbone, views ){

    // A view Manager to tigger the different views after the routes
    FernsWorld.ViewManager = function(page) {
      switch (page) {
        case 'home':
          //new FernsWorld.Views.Contact({ model : new FernsWorld.Models.Contact() });
          new FernsWorld.Views.Contact();
        break;
      }
    };

    //Router
    FernsWorld.Router.Main = Backbone.Router.extend({
      // These are the routes for the different Pages
      routes : {
          '': 'index'
        , ':page': 'pages'
      },
      index: function(){
        FernsWorld.loadPage('home',function(error){
          FernsWorld.ViewManager('home');
        });
      },
      pages : function(page){
        console.log(page)
        FernsWorld.loadPage(page ,function(error){
          if ( error.error === true ) {
            return FernsWorld.errorHandler();
          }
        });

      }
    });

    $(function(){

      // Load the Router on Dom Ready
      new FernsWorld.Router.Main;

      // Start the History
      Backbone.history.start();
    });

    // Expose to the Global Objects
    window.FernsWorld = FernsWorld;
  }

);