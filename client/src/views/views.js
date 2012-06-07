define([
  // Main App
  'fernsworld',

  // Libs
  'jquery',
  'underscore',
  'backbone',

  // Models
  '../models/models',

  // Collections
  '../collections/collections'
],

function( FernsWorld, $, _, Backbone, models, collections ) {

  // The Add Contact View
  FernsWorld.Views.Contact = Backbone.View.extend({
    el : '#addContact',
    events : {
      'click #submit' : 'saveContact'
    },
    initialize : function(){
      FernsWorld.Collections.ContactCollections = new FernsWorld.Collections.Contacts();
    },
    saveContact : function(event){
      event.preventDefault();

      this.model = new FernsWorld.Models.Contact();

      var values = $(event.currentTarget).parent().serializeArray()
        , modelObj = {}
        ;

      // Go through the Array's Values and Keys and psuh them into a new object
      _.each(values,function(v){
        modelObj[_.values(v)[0]] = _.values(v)[1];
      });

      // Set the Model
      // The Model auto validates
      this.model.set( modelObj );

    },
    render : function() {

    }
  });

  // Return FernsWorld Updated Object
  return FernsWorld;
});