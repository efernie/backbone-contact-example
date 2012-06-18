define([
  'jquery',
  'underscore',
  'backbone'
],

function( $, _, Backbone ) {

  return {
    // Set the global FernsWold Object with empty router,model,collection,view,template objects
    Router : {},
    Models : {},
    Collections : {},
    Views : {},
    Templates : {},
    // This loads the pages
    loadPage : function(name,cb){
      var that = this
        , $main = $('#main')
        ;
      // This determins if the page was already stored in the template object
      if(that.Templates[name]){
        $main
          .empty()
          .append(that.Templates[name]);
        return cb({ error: false });
      }
      // If not already loaded into the template object call it from the server
      $.ajax({
        'url': '/' + name,
        'type': 'GET',
        'dataType': 'html',
        beforeSend : function(){
          $main.empty();
        },
        success : function(data) {
          that.Templates[name] = data;
          $main.append(data);
          return cb({ error : false });
        },
        error : function(data) {
          return cb({ error : true })
        }
      });
    },
    errorHandler : function(error){
      console.log(error)
      $('#main').text('404');
    }
  };
});

