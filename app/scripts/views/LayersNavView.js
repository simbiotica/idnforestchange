define([
  'backbone',
  'underscore',
  'mps'
], function(Backbone, _, mps) {

  'use strict';

  var LayersNavView = Backbone.View.extend({

    el: '.layers-nav',

    events: {
      'click li': '_toggleLayer'
    },

    _toggleLayer: function(event) {
      var $currentTarget = $(event.currentTarget);
      var layerName = $currentTarget.data('layer');
      
      if (layerName) {
        $currentTarget.toggleClass('selected');
        mps.publish('map/toggle-layer', [layerName]);
      }
    }

  });

  return LayersNavView;

});
