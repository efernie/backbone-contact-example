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
  });

  return FernsWorld;
});