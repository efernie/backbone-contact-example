define([
  'fernsworld',
  'jquery',
  'underscore',
  'backbone'
],

function( FernsWorld, $, _, Backbone ) {

  FernsWorld.Models.Contact = Backbone.Model.extend({
    // This is Called when the model is set
    validate : function(attributes){
      // Regex to test but you should always validate on the server side.
      var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if( !emailReg.test(attributes.email) ){
        return 'Email Error';
      }
      // _.each(attributes,function(attr){
      //   console.log(attr.email)

      // });
      // console.log(this.attributes)
      // console.log(this)
    }
  });

  return FernsWorld;
});