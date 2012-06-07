
require.config({
  baseUrl: 'src/',

  deps : ['main'],

  paths: {
    jquery: '../assets/js/jquery-1.7.2.min',
    underscore: '../assets/js/underscore.min',
    backbone: '../assets/js/backbone.min',
    text: '../assets/js/text'
  },
  shim: {
    backbone: {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    }
  }

});