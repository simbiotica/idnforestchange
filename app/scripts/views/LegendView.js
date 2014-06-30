define([
  'backbone',
  'underscore',
  'handlebars',
  'mps',
  'text!../../templates/widget-legends.handlebars'
], function(Backbone, _, Handlebars, mps, tpl) {

  'use strict';

  var LegendView = Backbone.View.extend({

    className: 'widget legends',
    template: Handlebars.compile(tpl),

    initialize: function() {
      _.bindAll(this, '_toggleLegends', '_checkEmpty');
      this.render();
      this.legends = {};
      this._subscribe();
    },

    render: function() {
      this.$el.html(this.template());
      $('.widgets').append(this.el);

      this.$forestChangeLegend = this.$el.find('.forest-change-legend');
      this.$noLayers = this.$el.find('.no-layers');
    },

    _subscribe: function() {
      mps.subscribe('map/toggle-layer', this._toggleLegends);
    },

    _toggleLegends: function(layerName) {
      if (layerName === 'forestChange') {
        this.legends[layerName] = 1 - (this.legends[layerName] || 0);
        this._checkEmpty();
        this.$forestChangeLegend.toggleClass('is-hidden');
      }
    },

    _checkEmpty: function() {
      var layers = true;

      _.each(this.legends, function(active) {
        layers = layers && active;
      });

      (layers) ? this.$noLayers.addClass('is-hidden') :
        this.$noLayers.removeClass('is-hidden');
    }
  });

  return LegendView;

});
