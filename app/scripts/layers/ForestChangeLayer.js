
define([
  'underscore',
  'layers/CanvasLayer',
], function(_, CanvasLayer) {

  'use strict';

  var ForestChangeLayer = CanvasLayer.extend({

    init: function() {
      this._super();
      this.dataMaxZoom = 12;
      this.name = 'forestChange';
      //this.urlTemplate = 'http://earthengine.google.org/static/hansen_2013/gfw_loss_year/%z/%x/%y.png';
      this.urlTemplate = 'https://s3.amazonaws.com/idn/idnfc2/%z/%x/%y.png';
    },

    // use this.params here to filter...
    filterTileImgdata: function(imgdata, w, h, z) {
      var components = 4;

      for(var i = 0; i < w; ++i) {
        for(var j = 0; j < h; ++j) {
          var pixelPos = (j * w + i) * components;
          var band = imgdata[pixelPos];

          // if (band>0 && band<16) {
          //   imgdata[pixelPos] = 0;
          //   imgdata[pixelPos + 1]  = 55;
          //   imgdata[pixelPos + 2] = 0;
          //   imgdata[pixelPos + 3] = 100;
          // }

          if (band>0 && band<3) {
            //console.log(band);
            imgdata[pixelPos] = 0;
            //imgdata[pixelPos + 1] = band*10+200;
            switch (band){
              case 1:
                imgdata[pixelPos + 1]  = 155;
                break;
              case 2:
                imgdata[pixelPos + 1]  = 255;
                break;
              // case 3:
              //   imgdata[pixelPos + 1]  = 55;
              //   break;
            }
            imgdata[pixelPos + 2] = 0;
            imgdata[pixelPos + 3] = 100;
          } else if (band%3===1 && band<13 && this.params['2005']) {
            switch (band){
              case 4:
                imgdata[pixelPos] = 255;
                break;
              case 7:
                imgdata[pixelPos] = 95;
                break;
              case 10:
                imgdata[pixelPos] = 155;
                break;
            }
            //imgdata[pixelPos] = band*255;
            imgdata[pixelPos + 1] = 0;
            imgdata[pixelPos + 2] = 0;
            imgdata[pixelPos + 3] = 205;
          } else if (band%3===2 && band<13 && this.params['2010']) {
            switch (band){
              case 5:
                imgdata[pixelPos] = 255;
                break;
              case 8:
                imgdata[pixelPos] = 95;
                break;
              case 11:
                imgdata[pixelPos] = 155;
                break;
            }
            //imgdata[pixelPos] = band*255;
            imgdata[pixelPos + 1] = 0;
            imgdata[pixelPos + 2] = 0;
            imgdata[pixelPos + 3] = 205;
          } else if (band%3===0 && band>3 && band<13 && this.params['2012']) {
            switch (band){
              case 6:
                imgdata[pixelPos] = 255;
                break;
              case 9:
                imgdata[pixelPos] = 95;
                break;
              case 12:
                imgdata[pixelPos] = 155;
                break;
            }
            //imgdata[pixelPos] = band*255;
            imgdata[pixelPos + 1] = 0;
            imgdata[pixelPos + 2] = 0;
            imgdata[pixelPos + 3] = 205;
          } else {
            imgdata[pixelPos + 3] = 0;
          }

        }
      }
    }
  });

  return ForestChangeLayer;

});
