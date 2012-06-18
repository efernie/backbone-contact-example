
require.config({
  // Base public url
  baseUrl: 'src/',

  // Trigger the main.js file to init the app
  deps : ['main'],

  // Paths for the different libraries.
  paths: {
    jquery: '../assets/js/jquery-1.7.2.min',
    // Use lodash because underscore has removed AMD support
    underscore: '../assets/js/lodash.min',
    backbone: '../assets/js/backbone.min',

    // These are for the template handling
    hbs: '../assets/js/hbs',
    Handlebars: '../assets/js/handlebars',
    i18nprecompile : '../assets/js/i18nprecompile',
    json2 : '../assets/js/json2'
  },
  // Backbone shim to get lodash(underscore) and jquery to load it correctly
  shim: {
    backbone: {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    }
  },
  // Handlebar template plugin
  hbs : {
      templateExtension : 'hbs',
      disableHelpers: true,
      disableI18n : true
  }

});