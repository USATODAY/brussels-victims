define([
    "jquery",
    "underscore",
    "backbone",
    "dataManager"
], function($, _, Backbone, dataManager) {
    return Backbone.Model.extend({
        defaults: {
            highlight: false,
            tags: [],
            showNames: {}
        },
        initialize: function() {
            this.set({'filteredAppearancesTotal': this.get('total_appearances')});
            this.set({'filteredAppearances': this.get('appearances')});
            this.set({'showNames': dataManager.data.shows});
            this.listenTo(Backbone, 'filters:update', this.onFiltersUpdate);
        },
        onFiltersUpdate: function(filterArray, networkArray, categoryArray) {
            var _this = this;
            // _.defer(function() {
                // _this.filterAppearancesByNetwork(networkArray, categoryArray);
            // });
            this.filterAppearancesByNetwork(networkArray, categoryArray);
        },

        filterAppearancesByNetwork: function(networkArray, categoryArray) {
            var totalAppearances = this.get('appearances');
            var filteredAppearances = totalAppearances;
            if (networkArray.length > 0) {
                filteredAppearances = _.filter(filteredAppearances, function(appearance) {
                    if (appearance.network !== undefined) {
                        return _.contains(networkArray, appearance.network.toLowerCase());
                    } else {
                        return false;
                    }
                });
                            }
            if (categoryArray.length > 0) {
                filteredAppearances = _.filter(filteredAppearances, function(appearance) {
                    return _.contains(categoryArray, appearance.category.toLowerCase());
                });
            }
            
            this.set({'filteredApperances': filteredAppearances});
            this.set({'filteredAppearancesTotal': filteredAppearances.length});


        }

    });
});
