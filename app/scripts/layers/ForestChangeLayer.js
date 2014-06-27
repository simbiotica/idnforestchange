
define([
  'underscore',
  'layers/CanvasLayer',
  'mps'
], function(_, CanvasLayer, mps) {

  'use strict';

  var ForestChangeLayer = CanvasLayer.extend({

    init: function() {
      this._super();
      this.dataMaxZoom = 12;
      this.name = 'forestChange';
      this.urlTemplate = 'http://earthengine.google.org/static/hansen_2013/gfw_loss_year/%z/%x/%y.png';

      mps.subscribe('filter/change', _.bind(function(params) {
        this.params = params;
        this.updateTiles();
      }, this));
    },

    // use this.params here to filter...
    filterCanvasImage: function(imgdata, w, h, z) {
      var components = 4;

      for(var i = 0; i < w; ++i) {
        for(var j = 0; j < h; ++j) {

          var pixelPos = (j * w + i) * components;
          var yearLoss = imgdata[pixelPos];
          var yearStart = 2001;
          var yearEnd = 2013;

          yearLoss = 2000 + yearLoss;

          if (imgdata[pixelPos + 1] > 10 && (yearLoss >= yearStart && yearLoss < yearEnd)) {
            imgdata[pixelPos] = 220;
            imgdata[pixelPos + 1] = 102;
            imgdata[pixelPos + 2] = 153;
            imgdata[pixelPos + 3] = (z < 13) ? (12/z) * 255 : 255;
          } else {
            imgdata[pixelPos + 3] = 0;
          }
        }
      }
    }
  });

  return ForestChangeLayer;

});
