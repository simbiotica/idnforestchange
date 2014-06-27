define([
  'backbone',
  'underscore',
  'mps',
  'layers/ForestChangeLayer',
  'layers/ForestTypeLayer'
], function(Backbone, _, mps, ForestChangeLayer, ForestTypeLayer) {

  'use strict';

  var MapView = Backbone.View.extend({

    el: '.map',

    initialize: function() {
      _.bindAll(this, 'toggleLayer', 'addLayer');

      this.forestChangeLayer = new ForestChangeLayer();
      this.forestTypeLayer = new ForestTypeLayer();

      this.render();
    },

    render: function() {
      var options = {
        minZoom: 3,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: new google.maps.LatLng(20.50, -4.72)
      };

      this.map = new google.maps.Map(this.el, options);
      this.resize();
      this.addListeners();
    },

    addListeners: function(argument) {
      mps.subscribe('map/toggle-layer', this.toggleLayer);
    },

    toggleLayer: function(layerName) {
      if (layerName === 'forestChange') {
        if (this.isLayerRendered(layerName)) {
          this.removeLayer(layerName);
        } else {
          this.addLayer(this.forestChangeLayer);
        }
      }

      if (layerName === 'forestType') {
        if (this.isLayerRendered(layerName)) {
          this.removeLayer(layerName);
        } else {
          this.addLayer(this.forestTypeLayer);
        }
      }
    },

    addLayer: function(layer){
      this.map.overlayMapTypes.insertAt(0, layer);
    },

    isLayerRendered: function(layerName) {
      var overlaysLength = this.map.overlayMapTypes.getLength();
      if (overlaysLength > 0) {
        for (var i = 0; i< overlaysLength; i++) {
          var layer = this.map.overlayMapTypes.getAt(i);
          if (layer && layer.name === layerName) {
            return true;
          }
        }
      }
    },

    removeLayer: function(layerName) {
      var overlaysLength = this.map.overlayMapTypes.getLength();
      if (overlaysLength > 0) {
        for (var i = 0; i< overlaysLength; i++) {
          var layer = this.map.overlayMapTypes.getAt(i);
          if (layer && layer.name === layerName) {
            this.map.overlayMapTypes.removeAt(i);
          }
        }
      }
    },

    resize: function() {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setZoom(this.map.getZoom());
      this.map.setCenter(this.map.getCenter());
    }

  });

  return MapView;

});
