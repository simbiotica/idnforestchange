/**
 * The MapView class for the Google Map.
 *
 * @return MapView class (extends Backbone.View)
 */
define([
  'backbone',
  'underscore'
], function(Backbone, _) {

  'use strict';

  var MapView = Backbone.View.extend({

     el: '.map',

    initialize: function() {
      var options = {
        minZoom: 3,
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        center: new google.maps.LatLng(20.50, -4.72)
      };

      this.render(options);
    },

    /**
     * Creates the Google Maps and attaches it to the DOM.
     */
    render: function(options) {
      this.map = new google.maps.Map(this.el, options);
      this.resize();
      this._addListeners();
    },

    /**
     * Wires up Google Maps API listeners so that the view can respond to user
     * events fired by the UI.
     */
    _addListeners: function() {
    },

    /**
     * Used by MapPresenter to initialize the map view. This function clears
     * all layers from the map and then adds supplied layers in order.
     *
     * @param  {Array} layers Array of layer objects
     */
    initLayers: function(layers) {
      this.map.overlayMapTypes.clear();
      _.map(layers, this.addLayer, this);
    },

    /**
     * Used by MapPresenter to remove a layer by name.
     *
     * @param  {string} name The name of the layer to remove
     */
    removeLayer: function(name) {
      var overlays_length = this.map.overlayMapTypes.getLength();
      if (overlays_length > 0) {
        for (var i = 0; i< overlays_length; i++) {
          var layer = this.map.overlayMapTypes.getAt(i);
          if (layer && layer.name === name) {
            this.map.overlayMapTypes.removeAt(i);
          }
        }
      }
    },

    /**
     * Used by MapPresenter to add a layer to the map.
     *
     * @param {Object} layer The layer object
     */
    addLayer: function(layer) {
      var layerView = null;

      if (layer.slug === 'loss') {
        if (!_.has(this.layerViews, 'loss')) {
          layerView = new UMDLossLayerView(layer);
          this.layerViews.loss = layerView;
        }
      }
      this.map.overlayMapTypes.insertAt(0, layerView);
    },

    /**
     * Resizes the map.
     */
    resize: function() {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setZoom(this.map.getZoom());
      this.map.setCenter(this.map.getCenter());
    }

  });

  return MapView;

});
