require([
  'underscore'
], function (_) {

  'use strict';

  _.mixin({
    capitalize: function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  });

  _.mixin({
    toNumber: function(val) {
      if ((val === undefined || val === null || String(val).trim() === '')) {
        return undefined;
      } else if (isNaN(val)) {
        return undefined;
      } else {
        return Number(val);
      }
    }
  });
});
