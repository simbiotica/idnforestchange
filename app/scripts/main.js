'use strict';

require.config({

  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    underscore: '../vendor/underscore/underscore',
    backbone: '../vendor/backbone/backbone',
    class: '../vendor/Class.js/Class',
    gmap: 'gmap',
    text: '../vendor/requirejs-text/text',
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    class: {
      exports: 'Class'
    }
  }

});

/**
 * Application entry point.
 */
require([
  'backbone',
  'utils'
], function(gmap, MapView) {

  require(['router'],
    function(router) {
      if (!Backbone.History.started) {
        Backbone.history.start({pushState: true});
      }
    });

});
