
define([
  'underscore',
  'layers/CanvasLayer',
], function(_, CanvasLayer) {

  'use strict';

  var ForestChangeLayer = CanvasLayer.extend({

    init: function() {
      this._super();
      this.dataMaxZoom = 10;
      this.name = 'forestChange';
      //this.urlTemplate = 'http://earthengine.google.org/static/hansen_2013/gfw_loss_year/%z/%x/%y.png';
      this.urlTemplate = 'https://s3.amazonaws.com/idn/idnfc2/%z/%x/%y.png';
    },

    // use this.params here to filter...
    filterTileImgdata: function(imgdata, w, h, z) {
      var components = 4;
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
          //console.log(this.params)
          switch (year){
              case 2000:
              if(band===1 || band===10 ||  band===11 || band===12 ){
                  //degraded
                  imgdata[pixelPos] = 0;
                  imgdata[pixelPos + 1]  = 155;
                  imgdata[pixelPos + 2] = 0;
                  imgdata[pixelPos + 3] = 100;
              }else if(band===2 || band===4 || band===5 || band===6 || band===7 || band===8 || band===9 || band>12){
                  //intact
                  imgdata[pixelPos] = 30;
                  imgdata[pixelPos + 1]  = 90;
                  imgdata[pixelPos + 2] = 60;
                  imgdata[pixelPos + 3] = 100;

              }else{
                imgdata[pixelPos + 3] = 0;
              }
              break;

              case 2005:
              if(band===1 || band===7 ||  band===11 || band===12 || band===13 || band===14){
                //degraded
                imgdata[pixelPos] = 0;
                imgdata[pixelPos + 1]  = 155;
                imgdata[pixelPos + 2] = 0;
                imgdata[pixelPos + 3] = 100;
              }else if(band===2 || band===5|| band===6 || band===8 || band===9 || band===15){
                  //intact
                  imgdata[pixelPos] = 30;
                  imgdata[pixelPos + 1]  = 90;
                  imgdata[pixelPos + 2] = 60;
                  imgdata[pixelPos + 3] = 100;

              }else{
                imgdata[pixelPos + 3] = 0;
              }
              break;

              case 2010:
              if(band===1 || band===8 || band===12 || band===14 || band===15){
                //degraded
                imgdata[pixelPos] = 0;
                imgdata[pixelPos + 1]  = 155;
                imgdata[pixelPos + 2] = 0;
                imgdata[pixelPos + 3] = 100;
                }else if(band===2 || band===6 || band===9 ){
                    //intact
                    imgdata[pixelPos] = 30;
                    imgdata[pixelPos + 1]  = 90;
                    imgdata[pixelPos + 2] = 60;
                    imgdata[pixelPos + 3] = 100;

                }else{
                  imgdata[pixelPos + 3] = 0;
                }

              break;
              case 2012:
              if(band===1 || band===9 ){
                //degraded
                imgdata[pixelPos] = 0;
                imgdata[pixelPos + 1]  = 155;
                imgdata[pixelPos + 2] = 0;
                imgdata[pixelPos + 3] = 100;
            }else if(band===2 ){
                //intact
                imgdata[pixelPos] = 30;
                imgdata[pixelPos + 1]  = 90;
                imgdata[pixelPos + 2] = 60;
                imgdata[pixelPos + 3] = 100;

            }else{
              imgdata[pixelPos + 3] = 0;
            }
            break;




          }





          // imgdata[pixelPos + 3] = 0;
          // if (this.params['2000']) {
          //   if(band===1 || band===10 ||  band===11 || band===12 ){
          //       //degraded
          //       imgdata[pixelPos] = 0;
          //       imgdata[pixelPos + 1]  = 155;
          //       imgdata[pixelPos + 2] = 0;
          //       imgdata[pixelPos + 3] = 100;
          //   }else if(band===2 || band===4 || band===5 || band===6 || band===7 || band===8 || band===9 || band>12){
          //       //intact
          //       imgdata[pixelPos] = 30;
          //       imgdata[pixelPos + 1]  = 90;
          //       imgdata[pixelPos + 2] = 60;
          //       imgdata[pixelPos + 3] = 100;

          //   }else{
          //     imgdata[pixelPos + 3] = 0;
          //   }


          // }else if (this.params['2005']) {
          //   if(band===1 || band===7 ||  band===11 || band===12 || band===13 || band===14){
          //       //degraded
          //       imgdata[pixelPos] = 0;
          //       imgdata[pixelPos + 1]  = 155;
          //       imgdata[pixelPos + 2] = 0;
          //       imgdata[pixelPos + 3] = 100;
          //   }else if(band===2 || band===5|| band===6 || band===8 || band===9 || band===15){
          //       //intact
          //       imgdata[pixelPos] = 30;
          //       imgdata[pixelPos + 1]  = 90;
          //       imgdata[pixelPos + 2] = 60;
          //       imgdata[pixelPos + 3] = 100;

          //   }else{
          //     imgdata[pixelPos + 3] = 0;
          //   }
            


          // }else if (this.params['2010']) {
          //   if(band===1 || band===8 || band===12 || band===14 || band===15){
          //       //degraded
          //       imgdata[pixelPos] = 0;
          //       imgdata[pixelPos + 1]  = 155;
          //       imgdata[pixelPos + 2] = 0;
          //       imgdata[pixelPos + 3] = 100;
          //   }else if(band===2 || band===6 || band===9 ){
          //       //intact
          //       imgdata[pixelPos] = 30;
          //       imgdata[pixelPos + 1]  = 90;
          //       imgdata[pixelPos + 2] = 60;
          //       imgdata[pixelPos + 3] = 100;

          //   }else{
          //     imgdata[pixelPos + 3] = 0;
          //   }


          // }else if (this.params['2012']) {
          //   if(band===1 || band===9 ){
          //       //degraded
          //       imgdata[pixelPos] = 0;
          //       imgdata[pixelPos + 1]  = 155;
          //       imgdata[pixelPos + 2] = 0;
          //       imgdata[pixelPos + 3] = 100;
          //   }else if(band===2 ){
          //       //intact
          //       imgdata[pixelPos] = 30;
          //       imgdata[pixelPos + 1]  = 90;
          //       imgdata[pixelPos + 2] = 60;
          //       imgdata[pixelPos + 3] = 100;

          //   }else{
          //     imgdata[pixelPos + 3] = 0;
          //   }



          // }else{
          //     imgdata[pixelPos + 3] = 0;
          //   }




          // if (band>0 && band<3) {
          //   //console.log(band);
          //   imgdata[pixelPos] = 0;
          //   //imgdata[pixelPos + 1] = band*10+200;
          //   switch (band){
          //     case 1:
          //       imgdata[pixelPos + 1]  = 155;
          //       break;
          //     case 2:
          //       imgdata[pixelPos + 1]  = 255;
          //       break;
          //     // case 3:
          //     //   imgdata[pixelPos + 1]  = 55;
          //     //   break;
          //   }
          //   imgdata[pixelPos + 2] = 0;
          //   imgdata[pixelPos + 3] = 100;
          // } else if (band%3===1 && band<13 && this.params['2005']) {
          //   switch (band){
          //     case 4:
          //       imgdata[pixelPos] = 255;
          //       break;
          //     case 7:
          //       imgdata[pixelPos] = 95;
          //       break;
          //     case 10:
          //       imgdata[pixelPos] = 155;
          //       break;
          //   }
          //   //imgdata[pixelPos] = band*255;
          //   imgdata[pixelPos + 1] = 0;
          //   imgdata[pixelPos + 2] = 0;
          //   imgdata[pixelPos + 3] = 205;
          // } else if (band%3===2 && band<13 && this.params['2010']) {
          //   switch (band){
          //     case 5:
          //       imgdata[pixelPos] = 255;
          //       break;
          //     case 8:
          //       imgdata[pixelPos] = 95;
          //       break;
          //     case 11:
          //       imgdata[pixelPos] = 155;
          //       break;
          //   }
          //   //imgdata[pixelPos] = band*255;
          //   imgdata[pixelPos + 1] = 0;
          //   imgdata[pixelPos + 2] = 0;
          //   imgdata[pixelPos + 3] = 205;
          // } else if (band%3===0 && band>3 && band<13 && this.params['2012']) {
          //   switch (band){
          //     case 6:
          //       imgdata[pixelPos] = 255;
          //       break;
          //     case 9:
          //       imgdata[pixelPos] = 95;
          //       break;
          //     case 12:
          //       imgdata[pixelPos] = 155;
          //       break;
          //   }
          //   //imgdata[pixelPos] = band*255;
          //   imgdata[pixelPos + 1] = 0;
          //   imgdata[pixelPos + 2] = 0;
          //   imgdata[pixelPos + 3] = 205;
          // } else {
          //   imgdata[pixelPos + 3] = 0;
          // }

        }
      }
    }
  });

  return ForestChangeLayer;

});
