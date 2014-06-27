/**
 * The router module.
 *
 * Router handles app routing and URL parameters and updates Presenter.
 *
 * @return singleton instance of Router class (extends Backbone.Router).
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'gmap',
  'views/MapView',
], function($, _, Backbone, gmap, MapView) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'map'
    },

    map: function() {
      gmap.init(_.bind(function() {
        if (!this.mapView) {
          this.mapView = new MapView();
        }
      }, this));
    }
  });

  var router = new Router();

  return router;

});
