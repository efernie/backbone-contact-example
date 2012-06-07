define([
  'jquery',
  'underscore',
  'backbone'
],

function( $, _, Backbone ) {

  return {
    Router : {},
    Models : {},
    Collections : {},
    Views : {},
    Templates : {},
    loadPage : function(name,cb){
      var that = this;
      if(that.Templates[name]){
        $('#main')
          .empty()
          .append(that.Templates[name]);
        return cb({ error: false });
      }
      $.ajax({
        'url': '/' + name,
        'type': 'GET',
        'dataType': 'html',
        beforeSend : function(){
          $('#main').empty();
        },
        success : function(data) {
          that.Templates[name] = data;
          $('#main').append(data);
          return cb({ error : false });
        },
        error : function(data) {
          return cb({ error : true })
        }
      });
    },
    errorHandler : function(){
      $('#main').text('404');
    }
  };
});