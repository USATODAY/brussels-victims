 define([
  "jquery",
  "underscore",
  'lib/BackboneRouter',
  ], 
  function($, _, Backbone) { 
    var Router = Backbone.Router.extend({

      routes: {
        "": "home",
        "_": "home",
        'last-week/': 'lastWeek',
        'filters/:filterStr': 'filters'
        
      },

      home: function() {
        Backbone.trigger('app:reset');
      },


      lastWeek: function() {
        Backbone.trigger('route:last-week');
      },

      filters: function(filterStr) {
        var filterArray = filterStr.split('-');
        Backbone.trigger('route:filters', filterArray);
      }

    });

   _.extend(Router, Backbone.Events);

   return new Router();
});
