define([
    "jquery",
    "underscore",
    "backbone",
    "api/analytics",
    "dataManager",
    "templates",
    "models/config",
    'models/shareModel',
    'collections/TagCollection',
    'views/tagsView',
    'views/shareView',
    "router"
],
    function(jQuery, _, Backbone, Analytics, dataManager, templates, config, ShareModel, TagCollection, TagsView, ShareView, router) {
        return Backbone.View.extend({
            el: '.iapp-menu',
            template: templates['menu.html'],
            events: {
                'click .iapp-menu-close': 'onCloseClick',
                "click .iapp-menu-button": "onMenuClick",
                'click .iapp-top-button': 'onTopClick',
                'click .iapp-reset-button': 'onResetClick'
            },
            initialize: function() {
                
                this.listenTo(this.model, 'change:isMenuOpen', this.updateState);
                this.listenTo(this.model, 'change:numdislikes', this.onDislikeChange);
                this.listenTo(this.model, 'change:numlikes', this.onLikeChange);
                this.listenTo(Backbone, 'window:scroll', this.onWindowScroll);
                this.render();
            },
            render: function() {
                this.updateState();
                this.$el.html(this.template(this.model.toJSON()));
                this.addSubViews();
                if (window.innerWidth >= this.model.get('mobileThreshold')){
                    this.model.set({'isMenuOpen': true});
                }
                this._defaultPanelOffset = this.$('.iapp-menu-panel').offset().top;
                return this;
            },
            addSubViews: function() {
                this.tagsCollection = new TagCollection(dataManager.data.filters);
                this.tagsView = new TagsView({collection: this.tagsCollection});
                
            },
            updateState: function() {
                if (this.model.get('isMenuOpen')) {
                    this.$el.addClass('iapp-menu-show').removeClass('iapp-menu-hide');
                } else {
                    this.$el.addClass('iapp-menu-hide').removeClass('iapp-menu-show');
                }
            },
            onCloseClick: function() {
                Analytics.trackEvent("Close menu button clicked");
                this.model.set({isMenuOpen: false});
                // $('body,html').removeClass('iapp-no-scroll');
            },
            onMenuClick: function() {
                Analytics.trackEvent("Open menu button clicked");
                this.model.set({isMenuOpen: true});
                if (window.innerWidth < this.model.mobileThreshhold) {
                     // $('body,html').addClass('iapp-no-scroll');
                }
            },
            onLikeChange: function() {
                var numLikes = this.model.get('numlikes');
                this.$('.iapp-menu-scoreboard-likes').find('.iapp-menu-scoreboard-score-number').text(numLikes);
            },
            onDislikeChange: function() {
                var numDislikes = this.model.get('numdislikes');
                this.$('.iapp-menu-scoreboard-dislikes').find('.iapp-menu-scoreboard-score-number').text(numDislikes);
            },
            onWindowScroll: _.throttle(function() {
               if (this.checkIsVisible()) {
                    this.$el.addClass('iapp-menu-scrolled');
               } else {
                    this.$el.removeClass('iapp-menu-scrolled');
               }
               if(this.checkIsAtTop()) {
                    this.$('.iapp-menu-panel').addClass('iapp-sticky');
               } else {
                    this.$('.iapp-menu-panel').removeClass('iapp-sticky');
               }
            }, 500),
            onTopClick: function() {
                $('body,html').animate({scrollTop: 0}, 500);
            },

            checkIsAtTop: function() {
                var $panel = this.$('.iapp-menu-panel');
                var $window = $(window);
                var $cardWrap = $('.iapp-card-wrap');
                if (this._defaultPanelOffset <= $window.scrollTop()) {
                    return true;
                } else {
                    return false;
                }
            },

            checkIsVisible: function() {

                var $elem = this.$('.iapp-menu-panel');
                var $window = $(window);

                var docViewTop = $window.scrollTop();
                var docViewBottom = docViewTop + $window.height();

                var elemTop = $elem.offset().top;
                var elemBottom = elemTop + $elem.height();


                return docViewTop > elemBottom;

            },
            onResetClick: function() {
                Backbone.trigger('app:reset');
                router.navigate('_');
            }

        });
});
