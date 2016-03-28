define(
  [
    'jquery',
    'underscore',
    'backbone',
    'views/TagView',
    'models/config',
    'templates',
    'dataManager'
  ],
  function(jQuery, _, Backbone, TagView, config, templates, dataManager) {
    return Backbone.View.extend({
        initialize: function() {
           // this.listenTo(Backbone, 'tags:filter-ready', this.throttledFilter);
           this.listenTo(Backbone, 'video:set', this.advanceSub);
           // this.listenTo(Backbone, 'tags:reset', this.onTagsReset);
           // this.listenTo(Backbone, 'app:reset', this.onReset);
           this.listenTo(this.collection, 'change:isActive', this.onFilter);
           
           this.render();
        },
        events: {
            'click .iapp-filter-button-clear': 'onClear'
        },
        el: '.iapp-filters-wrap',

        template: templates['tags.html'],
        
        
        render: function(data) {

            

            var _this = this;
            this.$el.html(this.template());
            var occupation_filters = this.collection.where({tagCategory: "occupation"});
            var race_filters = this.collection.where({tagCategory: "race"});
            var gender_filters = this.collection.where({tagCategory: "gender"});
            var network_filters = this.collection.where({tagCategory: "network"});
            var party_filters = this.collection.where({tagCategory: "party"});

            _.each(occupation_filters, function(tagModel) {
                var tagView = new TagView({model: tagModel});
                _this.$('.occupation-filters').append(tagView.render().el);
            });

            _.each(race_filters, function(tagModel) {
                var tagView = new TagView({model: tagModel});
                _this.$('.race-filters').append(tagView.render().el);
            });
            _.each(gender_filters, function(tagModel) {
                var tagView = new TagView({model: tagModel});
                _this.$('.gender-filters').append(tagView.render().el);
            });

            _.each(network_filters, function(tagModel) {
                var tagView = new TagView({model: tagModel});
                _this.$('.network-filters').append(tagView.render().el);
            });
            
            _.each(party_filters, function(tagModel) {
                var tagView = new TagView({model: tagModel});
                _this.$('.party-filters').append(tagView.render().el);
            });
            // this.collection.each(function(tagModel) {
            //      var tagView = new TagView({model: tagModel});
            //      _this.$el.append(tagView.render().el);
            // });

            _.defer(function() {
                // _this.$el.isotope({
                //     itemSelector: '.iapp-filter-button',
                //     transitionDuration:  0,
                //     layoutMode: 'fitRows'
                // });
            });

            this.$el.append('<div class="iapp-filter-button iapp-filter-button-clear">Clear Filters</div>');
            this.filter();
            
            return this;
        },
        
        filter: function() {
            // this.$el.isotope({filter: ':not(.unavailable)'}); 
            
        },
        
        throttledFilter: _.throttle(function() {
                this.filter();
            }, 100, {leading: false}
        ),
        
       
        onTagsReset: function() {
            // this.$el.isotope('layout');
        },

        onReset: function() {
            var _this = this;
            _.delay(function() {
                // _this.$el.isotope('layout');
            }, 500);
        },

        onFilter: function() {
            if (this.collection.filter(function(tag) {
                return tag.get('isActive');
            }).length > 0) {
                this.$('.iapp-filter-button-clear').addClass('show');
            } else {
                this.$('.iapp-filter-button-clear').removeClass('show');
            }
        },
        onClear: function() {
            this.collection.each(function(tagModel) {
                tagModel.set({'isActive': false});
            });
        }

        
    });


});
