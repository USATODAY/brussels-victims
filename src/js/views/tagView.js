define(
  [
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'api/analytics'
  ],
  function(jQuery, _, Backbone, templates, Analytics) {
    return Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model, "change:isAvailable", this.onModelChangeAvailability);
            this.listenTo(this.model, "change:isActive", this.onModelChangeActive);
        },
        events:  {
            'click': 'onClick'
        },
        className: 'iapp-filter-button',
        // template: templates['tag.html'],
        render: function(data) {
            if (this.model.get('isAvailable') === false) {
                this.$el.addClass('unavailable');
            }
            this.$el.html(this.model.get('tagPretty'));    
            return this;
        },
        onClick: function() {
            Analytics.trackEvent('Filter clicked');
            //toggle active state of model when tag is clicked
            this.model.set({'isActive': !this.model.get('isActive')});

        },
        onModelChangeAvailability: function(e) {
            if (this.model.get('isAvailable')) {
               this.$el.removeClass('unavailable'); 
            } else {
                this.$el.addClass('unavailable');
            }
            Backbone.trigger('tags:filter-ready');
        },

        onModelChangeActive: function() {
            if (this.model.get('isActive')) {
               this.$el.addClass('iapp-selected'); 
            } else {
                this.$el.removeClass('iapp-selected'); 
            }

        }
    });


});
