define([
  // Main App
  'fernsworld',

  // Libs
  'jquery',
  'underscore',
  'backbone',

  // Models
  '../models/models'
],

function( FernsWorld, $, _, Backbone, models ) {

  // The Add Contact VIew
  FernsWorld.Views.Contact = Backbone.View.extend({
    el : '#addContact',
    events : {
      'click #submit' : 'saveContact'
    },
    initialize : function(){

    },
    saveContact : function(event){
      event.preventDefault();

      var values = $(event.currentTarget).parent().serializeArray();
      console.log(values ,_)
      _.each(values,function(v,k){
        console.log(v,k)
      })

      //this.model.set( values );
      console.log( this.model )
      //this.model.isValid();
    },
    render : function() {

    }
  });

  // Return FernsWorld Updated Object
  return FernsWorld;
});