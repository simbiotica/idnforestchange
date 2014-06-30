define([
  'backbone',
  'underscore',
  'mps'
], function(Backbone, _, mps) {

  'use strict';

  var FilterNavView = Backbone.View.extend({

    el: '.filter-nav',

    events: {
      'change input': '_publish'
    },

    _publish: function() {
      mps.publish('filter/change', [this._getParams()]);
    },

    _getParams: function() {
      var params = {};

      this.$el.find('input:checkbox:checked')
        .map(function() {
          params[this.value] = true;
        });

      return params;
    }
  });

  return FilterNavView;

});
