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
      console.log('validate', attributes.email)
      if( !attributes.email ){
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