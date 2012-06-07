define([
  'fernsworld',
  'jquery',
  'underscore',
  'backbone',

  // Models
  '../models/models'
],

function( FernsWorld, $, _, Backbone, models ) {

  FernsWorld.Collections.Contacts = Backbone.Collection.extend({
    model : FernsWorld.Models.Contact,
    url : '/src/sampledata.js',
    parse : function(response) {
      console.log(response)
      return response;
    }
  });

  return FernsWorld;
});