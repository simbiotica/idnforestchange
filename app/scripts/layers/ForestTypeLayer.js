
define([
  'underscore',
  'layers/CanvasLayer'
], function(_, CanvasLayer) {

  'use strict';

  var ForestTypeLayer = CanvasLayer.extend({

    init: function() {
      this._super();
      this.dataMaxZoom = 10;
      this.name = 'forestType';
      //this.urlTemplate = 'http://earthengine.google.org/static/hansen_2013/gfw_loss_year/%z/%x/%y.png';
      this.urlTemplate = 'https://s3.amazonaws.com/idn/idnft/%z/%x/%y.png';
    },

    filterTileImgdata: function(imgdata, w, h, z) {
    }

  });

  return ForestTypeLayer;

});
