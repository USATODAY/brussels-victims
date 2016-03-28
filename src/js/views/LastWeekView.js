define([
    'jquery',
    'imagesloaded',
    'isotope',
    'api/analytics',
    'underscore',
    'dataManager',
    'lib/BackboneRouter',
    'templates',
    'models/config',
    'views/cardView',
    'views/detailView',
    'router',
    'unveil',
    'jquery_ui_touch_punch'
], 
    function(jQuery, imagesLoaded, Isotope, Analytics, _, dataManager, Backbone, templates, config, cardView, detailView, router) {

        return Backbone.View.extend({

            initialize: function() {
                this.listenTo(this.collection, 'change:highlight', this.showDetail);
                this.render();
            },
            className: 'iapp-last-week-wrap',
            template: templates['lastWeekView.html'],
            render: function() {
                this.sortCollection();
                var _this = this;
                _.each(this.sortedCollection, function(networkArray) {
                    _this.$el.append(_this.template({networkGuests: networkArray}));
                });
                this.$('img').unveil(200);
                return this;
            },
            events: {
                'click .card': 'onCardClick'
            },
            sortCollection: function() {
                var sortedCollectionObj = {};
                this.collection.each(function(itemModel) {
                    _.each(itemModel.get('last_week_appearances'), function(_network) {
                        if (sortedCollectionObj[_network] === undefined) {
                            sortedCollectionObj[_network] = [];
                        }
                        var appearancePersonObj = itemModel.toJSON();
                        appearancePersonObj.last_week_network = _network;
                        sortedCollectionObj[_network].push(appearancePersonObj);
                    });
                });
                this.sortedCollection = sortedCollectionObj;
            },
            showDetail: function(model) {
            
              if(model.get('highlight')) {
                this.detailView =  new detailView({model: model});
                this.$el.append(this.detailView.render().el);
              }
            },
            onCardClick: function(e) {
                var $target = $(e.currentTarget);
                var guest = $target.find('.iapp-card-info-header').text();
                var model = this.collection.find(function(model){
                    return model.get('guest') == guest;
                });
                model.set({'highlight': true});
            }

        });

});
