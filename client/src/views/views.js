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

  // Fetch the collection from server.
  FernsWorld.Collections.ContactCollections.fetch();

  // Bind an add event to the collectino so when it is updated
  FernsWorld.Collections.ContactCollections.on('add',function(event){
    //that.render();
  });

  // Bind the reset event which happens when the collection is fetched from the server
  FernsWorld.Collections.ContactCollections.on('reset',function(event){
    //that.render();
  });

  // The Add Contact View
  FernsWorld.Views.Contact = Backbone.View.extend({
      el : '#addContact'
    , events : {
        'click #submit' : 'saveContact'
      }
    , initialize : function (){
        var that = this;

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

        var values = $(event.currentTarget).parent().serializeArray()
          , modelObj = {}
          ;

        // Go through the Array's Values and Keys and psuh them into a new object
        _.each(values, function (v) {
          modelObj[_.values(v)[0]] = _.values(v)[1];
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
        // WHen a model successfully validates add it to the collection
        FernsWorld.Collections.ContactCollections.add(model);
      }
    , render : function() {
        // Trigger the contact list view
        console.log( FernsWorld.Views )
        //FernsWorld.Views.contactList = new FernsWorld.Views.ContactList({ collection : this.collection });
        //var contactList = new FernsWorld.Views.ContactList({ collection : this.collection });
      }
  });

  // This view is for displaying the list of contacts
  FernsWorld.Views.ContactList = Backbone.View.extend({
      el : '#listContacts'
    , initialize : function(){
        var that = this;
        // If the template is not in cache then fetch it
        if( FernsWorld.Templates['contactView'] ){
          console.log('render')
          that.render();
        }else{
          // Grab the contact template
          require(['hbs!templates/contact'], function (contactView) {
            // Save the template to the view object
            FernsWorld.Templates['contactView'] = contactView;

            // Render the view object
            that.render();
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
          that.$el.append( FernsWorld.Templates.contactView( model.attributes ) );
          //that.$el.append( that.contactTemplate( model.attributes ) );
        });
      }
  });

  // Return FernsWorld Updated Object
  return FernsWorld;
});