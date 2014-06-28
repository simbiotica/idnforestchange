
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
    },

    // use this.params here to filter...
    filterTileImgdata: function(imgdata, w, h, z) {
      var components = 4;

      for(var i = 0; i < w; ++i) {
        for(var j = 0; j < h; ++j) {
          var pixelPos = (j * w + i) * components;

          if (imgdata[pixelPos + 1] > 10) {
            imgdata[pixelPos] = 220;
            imgdata[pixelPos + 1] = 102;
            imgdata[pixelPos + 2] = 153;
            if (this.params.param1) {
              imgdata[pixelPos + 2] = 255;
            }
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
