define([
  'backbone',
  'underscore',
  'mps'
], function(Backbone, _, mps) {

  'use strict';

  var FilterNavView = Backbone.View.extend({

    el: '.filter-nav',

    events: {
      'change input': 'publish'
    },

    publish: function() {
      mps.publish('filter/change', [this.getParams()]);
    },

    getParams: function() {
      var params = [];

      this.$el.find('input:checkbox:checked')
        .map(function() {
          params.push(this.value);
        });

      return params;
    }
  });

  return FilterNavView;

});
