define([
  // Main App
  'fernsworld',

  // Libs
  'jquery',
  'underscore',
  'backbone',
  'hbs',
  //'handlebars',

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
      var that = this;

      // Start the collection
      FernsWorld.Collections.ContactCollections = new FernsWorld.Collections.Contacts();

      this.collection = FernsWorld.Collections.ContactCollections;
      // Bind the reset event which happens when the collection is fetched from the server
      FernsWorld.Collections.ContactCollections.on('reset',function(event){
        that.render();
      });

      FernsWorld.Collections.ContactCollections.on('add',function(event){
        that.render();
      });

      // Fetch the Collection
      FernsWorld.Collections.ContactCollections.fetch();

    },
    saveContact : function(event){
      // Prevent the Default Submit Funciton
      event.preventDefault();

      // Create a New Model
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
      console.log(modelObj)
      return this.model.set( modelObj );

    },
    render : function() {
      var that = this;

      // Require the contact template
      require(['hbs!templates/contact'], function(contactView) {
        _.each(that.collection.models,function(model){
          that.$el.append( contactView( model.attributes ) );
        });
      });

    }
  });

  // Return FernsWorld Updated Object
  return FernsWorld;
});