define(
  [
    'jquery',
    'underscore',
    'backbone',
    'router',
    'models/TagModel'
  ], function(jQuery, _, Backbone, router, TagModel){

    return Backbone.Collection.extend({
        model: TagModel,
        initialize: function() {
            
            this.on('change:isActive', this.onActiveChange); 
            this.listenTo(Backbone, 'items:filtered', this.onItemsFiltered);
            this.listenTo(Backbone, 'tags:reset', this.onTagsReset);
            this.listenTo(Backbone, 'route:filters', this.onFilterRoute);
            this.listenTo(Backbone, 'app:reset', this.onAppReset);
        },

        onActiveChange: function() {
            var networkArray = [];
            var categoryArray = [];
            var filterArray = [];
            var activeModels = this.where({'isActive': true});
            _.each(activeModels, function(model) {
                //track array of network tags
                if (model.get('isNetwork')) {
                    networkArray.push(model.get('tagName'));
                }

                //track array of category tags
                if (model.get('isCategory')) {
                    categoryArray.push(model.get('tagName'));
                }

                filterArray.push(model.get('tagName'));
            });

            if (filterArray.length === 0) {
                router.navigate('/_');
            } else {
                var filterSlug = filterArray.join('-');
                router.navigate('filters/' + filterSlug);
            }


            Backbone.trigger('filters:update', filterArray, networkArray, categoryArray);
        },

        onItemsFiltered: function(availableTags) {
            this.each(function(model) {

                // show all the tags that dont show up in the remaining available tags
                if (_.contains(availableTags, model.get('tagName'))) {
                    
                    model.set({'isAvailable': true});
                    
                } else {

                    //don't hide the liked and disliked filters even though they don't show up in the available tags
                    if (model.get('tagName') != 'iapp-liked' && model.get('tagName') != 'iapp-disliked') {
                        model.set({'isAvailable': false});
                    }
                }
            });

            
        },
        onTagsReset: function() {
            this.each(function(tag) {
                tag.set({'isActive': false});
            });
        },
        onFilterRoute: function(filterArray) {
            var _this = this; 
            _.each(filterArray, function(filter) {
                var filterModel = _this.findWhere({'tagName': filter});
                filterModel.set({'isActive': true});
             });
        },
        onAppReset: function() {
            this.onTagsReset();
        }
             
        
    });

});
