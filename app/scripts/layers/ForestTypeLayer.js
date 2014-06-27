
define([
  'layers/CanvasLayer'
], function(CanvasLayer) {

  'use strict';

  var ForestTypeLayer = CanvasLayer.extend({

    init: function() {
      this._super();
      this.dataMaxZoom = 12;
      this.name = 'forestType';
      this.urlTemplate = 'http://earthengine.google.org/static/hansen_2013/gfw_loss_year/%z/%x/%y.png';
    },

    filterCanvasImage: function(imgdata, w, h, z) {
    }

  });

  return ForestTypeLayer;

});
