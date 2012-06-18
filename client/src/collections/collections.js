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
      model : FernsWorld.Models.Contact
    , url : '/data/sampledata'
    , parse : function (response) {
        console.log( response )
        return response;
      }
  });

  // Start the collection
  FernsWorld.Collections.ContactCollections = new FernsWorld.Collections.Contacts();

  return FernsWorld;
});