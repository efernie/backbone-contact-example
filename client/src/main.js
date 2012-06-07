require([
  'fernsworld',
  // Libs
  'jquery',
  'underscore',
  'backbone',

  // Views
  'views/views'

  ],

  function( FernsWorld, $, _ , Backbone, views ){

    FernsWorld.ViewManager = function(page) {
      switch (page) {
        case 'home':
          new FernsWorld.Views.Contact({ model : new FernsWorld.Models.Contact() });
        break;
      }
    };

    //Router
    FernsWorld.Router.Main = Backbone.Router.extend({
      routes : {
          '': 'index'
        , ':page': 'pages'
      },
      index: function(){
        FernsWorld.loadPage('home',function(error){
          //console.log(error);
          FernsWorld.ViewManager('home');
        });
      },
      pages : function(page){
        console.log(page)
        FernsWorld.loadPage(page ,function(error){
          console.log(error.error)
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

  }
);