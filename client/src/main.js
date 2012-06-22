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

    // Start of an error handler
    FernsWorld.loadPage.prototype.errorHandler = function (){
      console.log('error')
    };
    // A view Manager to tigger the different views after the routes
    FernsWorld.ViewManager = function (page) {
      switch (page) {
        case 'home':
          FernsWorld.Views.contact = new FernsWorld.Views.Contact();
          FernsWorld.Views.contactList = new FernsWorld.Views.ContactList({
            collection : FernsWorld.Collections.ContactCollections
          });
        break;
      }
    };

    //Router
    FernsWorld.Router.Main = Backbone.Router.extend({
        // These are the routes for the different Pages
        routes : {
            '': 'index'
          , ':page': 'pages'
        }
      , index: function() {
        console.log('index')
          //FernsWorld.loadPage('home', function (error) {
            FernsWorld.ViewManager('home');
          //});
        }
      , pages : function (page) {
          console.log(page)
          FernsWorld.loadPage(page , function (error) {
            if ( error.error === true ) {
              //return FernsWorld.errorHandler();
            }
          });
        }
    });

    $(function(){

      // Load the Router on Dom Ready
      new FernsWorld.Router.Main;

      // Start the History
      Backbone.history.start({ pushState : true });
    });


    /*
      This is borrowed from https://gist.github.com/1142129 by tbranyen
     */
    $(document).on("click", "a:not([data-bypass])", function(evt) {
      // Get the anchor href and protcol
      var href = $(this).attr("href");
      var protocol = this.protocol + "//";

      // Ensure the protocol is not part of URL, meaning it's relative.
      if (href && href.slice(0, protocol.length) !== protocol &&
          href.indexOf("javascript:") !== 0) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.
        console.log('href',href)
        Backbone.history.navigate(href, true);
      }
    });

    // Expose to the Global Objects
    window.FernsWorld = FernsWorld;
  }

);