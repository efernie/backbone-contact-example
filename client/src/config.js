
require.config({
  baseUrl: 'src/',

  deps : ['main'],

  paths: {
    jquery: '../assets/js/jquery-1.7.2.min',
    // Use lodash because underscore has removed AMD support
    underscore: '../assets/js/lodash.min',
    backbone: '../assets/js/backbone.min',
    q: '../assets/js/q.min',

    // These are for the template handling
    hbs: '../assets/js/hbs',
    Handlebars: '../assets/js/handlebars',
    i18nprecompile : '../assets/js/i18nprecompile',
    json2 : '../assets/js/json2'
  },
  shim: {
    backbone: {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    }
  },
  hbs : {
      templateExtension : 'hbs',
      disableHelpers: true,
      disableI18n : true
  }

});