  // Questions Collection
  // ---------------

define([
    "jquery",
    "underscore",
    "backbone",
    'models/ItemModel',
], function($, _, Backbone, ItemModel) {

   

    // The collection of questions is backed by json file
    return Backbone.Collection.extend({

      initialize: function() {

        this.listenTo(Backbone, "filters:update", this.onFilterUpdate);
        this.listenTo(Backbone, 'app:reset', this.onResetApp);
      },

      // Reference to this collection's model.
      model: ItemModel,

      onFilterUpdate: function(filterArray, networkArray) {
           this.filterByTagArray(filterArray);
           var availableTags = this.getAvailableTags();
           Backbone.trigger("items:filtered", availableTags);
      },

      filterByTagArray: function(filterArray) {
            function arrContains(array1, array2) {
                var diff = _.difference(array1, array2);
                if (diff.length === 0) {
                    return true;
                } else {
                    return false;
                }
            }

            this.each(function(model) {
                var modelTags = model.get('tags');
                var isAvailable = arrContains(filterArray, modelTags);

                if (isAvailable) {
                    model.set({'isAvailable': true});
                } else {
                    model.set({'isAvailable': false});
                }
            });

            //cache a copy of filtered items
            this._availableItems = this.where({'isAvailable': true});

        },
        getAvailableTags: function() {
            availableTags = [];

            _.each(this._availableItems, function(model) {
                availableTags = _.union(availableTags, model.get('tags'));
            });
            return availableTags;
        },
        onResetApp: function() {
          this.each(function(model) {
            model.set({'highlight': false});
          });
        }



    });

  });
