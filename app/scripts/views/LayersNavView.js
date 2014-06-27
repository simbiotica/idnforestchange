define([
  'backbone',
  'underscore',
  'mps'
], function(Backbone, _, mps) {

  'use strict';

  var LayersNavView = Backbone.View.extend({

     el: '.layers-nav',

    events: {
      'click li': 'toggleLayer'
    },

    toggleLayer: function(event) {
      var $currentTarget = $(event.currentTarget);
      var layerName = $currentTarget.data('layer');
      $currentTarget.toggleClass('selected');

      if (layerName) {
        mps.publish('map/toggle-layer', [layerName]);
      }
    }

  });

  return LayersNavView;

});
