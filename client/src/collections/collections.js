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

  // // Bind the reset event which happens when the collection is fetched from the server
  // FernsWorld.Collections.ContactCollections.on('reset',function(event){
  //   that.render();
  // });

  // // Bind an add event to the collectino so when it is updated
  // FernsWorld.Collections.ContactCollections.on('add',function(event){
  //   that.render();
  // });

  // // Fetch the Collection
  // FernsWorld.Collections.ContactCollections.fetch();

  return FernsWorld;
});