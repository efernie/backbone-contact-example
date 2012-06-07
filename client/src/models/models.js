define([
  'fernsworld',
  'jquery',
  'underscore',
  'backbone'
],

function( FernsWorld, $, _, Backbone ) {

  FernsWorld.Models.Contact = Backbone.Model.extend({
    validate : function(attributes){
      console.log(attributes)
    }
  });

  return FernsWorld;
});