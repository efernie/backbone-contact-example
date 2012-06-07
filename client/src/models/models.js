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
      _.each(attributes,function(attr){
        console.log(attr)
      });
      console.log(this.attributes)
    }
  });

  return FernsWorld;
});