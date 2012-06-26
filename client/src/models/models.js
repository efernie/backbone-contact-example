define([
  'fernsworld',
  'jquery',
  'underscore',
  'backbone'
],

function( FernsWorld, $, _, Backbone ) {

  FernsWorld.Models.Contact = Backbone.Model.extend({
    // This is Called when the model is set
    validate : function (attributes) {
      // Regex to test but you should always validate on the server side.
      var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      // Test the email if wrong return an error
      if( !emailReg.test(attributes.person.email) ){
        return 'Email Error';
      }

    }
  });

  return FernsWorld;
});