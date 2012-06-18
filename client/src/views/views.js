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

function( FernsWorld, $, _, Backbone, hbs, models, collections ) {

  // The Add Contact View
  FernsWorld.Views.Contact = Backbone.View.extend({
      el : '#addContact'
    , events : {
        'click #submit' : 'saveContact'
      }
    , initialize : function (){
        var that = this;

        // Bind the Contact collection to the view
        that.collection = FernsWorld.Collections.ContactCollections;

        // Bind the add event to the collection
        that.collection.on('add', that.render, this);

    }
    , saveContact : function (event){
        // Prevent the Default Submit Funciton
        event.preventDefault();

        // Create a New Model
        this.model = new FernsWorld.Models.Contact();

        // Bind the view modelError function to the model error event
        this.model.on('error', this.modelError, this);

        // Bind the view modelChange function to the model change event
        this.model.on('change', this.modelChange, this);

        // Serialize the values into an array
        var values = $(event.currentTarget).parent().serializeArray()
          // The model object the is the same on the server side
          , modelObj = {
              person : {}
            }
          ;

        // Go through the Array's Values and Keys and push them into a new object
        _.each(values, function (v) {
          modelObj.person[_.values(v)[0]] = _.values(v)[1];
        });

        // Empty the inputs
        $(event.currentTarget).parent().children('input').val('');

        // Set the Model
        // The Model auto validates
        return this.model.set( modelObj );

      }
    , modelError : function (model,error) {
        // When there is a validation error on the model this is where everything is handled
        console.log(model, error, this)
      }
    , modelChange : function (model) {
        // When a model successfully validates add it to the collection
        FernsWorld.Collections.ContactCollections.add(model);
      }
    , render : function() {
        // Trigger the contact list view
        FernsWorld.Views.contactList.render();
      }
  });

  // This view is for displaying the list of contacts
  FernsWorld.Views.ContactList = Backbone.View.extend({
      el : '#listContacts'
    , initialize : function(){
        var that = this;

        // Bind reset event to the collection
        that.collection.on('reset', that.render, this);

        // If the template is not in cache then fetch it
        if( FernsWorld.Templates['contactView'] ){
          // Fetch the collection
          that.collection.fetch();
        }else{
          // Grab the contact template
          require(['hbs!templates/contact'], function (contactView) {
            // Save the template to the view object
            FernsWorld.Templates['contactView'] = contactView;

            // Fetch the collection
            that.collection.fetch();
          });
        }
      }
    , render : function(){
        var that = this;

        // Clear the list
        that.$el.empty();
        // Go through each model in the collection
        _.each(that.collection.models, function (model) {

          // Append each model to the view el
          that.$el.append( FernsWorld.Templates.contactView( model.attributes.person ) );
        });
      }
  });

  // Return FernsWorld Updated Object
  return FernsWorld;
});