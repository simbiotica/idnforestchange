
define([
  'underscore',
  'd3',
  'layers/CanvasLayer'
], function(_, d3, CanvasLayer) {

  'use strict';

  var ForestTypeLayer = CanvasLayer.extend({

    init: function() {
      this._super();
      this.dataMaxZoom = 12;
      this.name = 'forestType';
      this.urlTemplate = 'http://earthengine.google.org/static/hansen_2013/gfw_loss_year/%z/%x/%y.png';
      //this.urlTemplate = 'https://s3.amazonaws.com/idn/idnft/%z/%x/%y.png';
    },

    filterTileImgdata: function(imgdata, w, h, z) {
      var components = 4; //rgba
      var pixel_pos;
      var zoom = 6;
    //---> power scale
    //var exp=config.compression;
    var exp=zoom<11?0.3+((zoom-3)/20):1;
    var myscale=d3.scale.pow().exponent(exp).domain([0,256]).range([0,256]);

    var year=2000;
      if (this.params['2000']) {
        year=2000;
      }else  if (this.params['2005']) {
        year=2005;
      }else  if (this.params['2010']) {
        year=2010;
      }else  if (this.params['2012']) {
        year=2012;
      }  

    for(var i=0; i < w; ++i) {
      for(var j=0; j < h; ++j) {
        var pixel_pos = (j*w + i) * components;
        var yearLoss = imgdata[pixel_pos]+1999;
        var intensity = imgdata[pixel_pos + 1];
        //yearLoss = 2005;

        if (yearLoss >= 1999 && yearLoss < year+1) {
           var c = 3;

          imgdata[pixel_pos] = 220;
          imgdata[pixel_pos + 1] = 102;
          imgdata[pixel_pos + 2] = 153;
          if (zoom < 13) {
            imgdata[pixel_pos+ 3] = intensity < 10 ? 0: (12/zoom)*255*c/3;
            //imgdata[pixel_pos+ 3] = myscale(intensity);
          } else {
            imgdata[pixel_pos+ 3] = intensity < 10 ? 0: 255*c/3;
            //imgdata[pixel_pos+ 3] = intensity ;
          }


        } else {
          imgdata[pixel_pos + 3] = 0;
        }

      }
    }
    }

  });

  return ForestTypeLayer;

});
