define([
  'jquery',
  'imagesloaded',
  'isotope',
  'api/analytics',
  'underscore',
  'lib/BackboneRouter',
  'templates',
  'models/config',
  'views/cardView',
  'views/detailView',
  'router',
  'unveil',
  'jquery_ui_touch_punch'
  ], 
  function(jQuery, imagesLoaded, Isotope, Analytics, _, Backbone, templates, config, cardView, detailView, router) {

  return Backbone.View.extend({
    el: ".iapp-card-wrap",
    
    events: {
  
    },

    initialize: function() {
        this.$noResultsMessage = $('.no-results-wrap');
        this.listenTo(this.collection, 'change:highlight', this.showDetail);
        this.listenTo(router, "highlight", this.onHighlightRoute);
        this.listenTo(router, "homeRoute", this.onHomeRoute);
        this.listenTo(Backbone, "filters:update", this.filter);
        this.listenTo(Backbone, 'menu:show', this.onMenuShow);
        this.listenTo(Backbone, 'menu:hide', this.onMenuHide);
        this.listenTo(Backbone, 'route:share', this.onRouteShare);
        this.listenTo(Backbone, 'app:reset', this.onAppReset);
        this.listenTo(Backbone, 'search', this.searchByName);
        this.listenTo(Backbone, 'detail:next', this.showNextDetail);
        this.listenTo(Backbone, 'detail:previous', this.showPreviousDetail);
        this.render();

    },

    addOne: function(item) {
      var view = new cardView({model: item});
      this.$el.append(view.render().el);
    },

    showDetail: function(model) {
      if(model.get('highlight')) {
        this.currentModelIndex = this.collection.models.indexOf(model);
        var showNext = true,
            showPrevious = true;
        if (this.currentModelIndex <=0) {
          showNext = false;
        } else if (this.currentModelIndex >= this.collection.models.length -1) {
          showPrevious = false;
        }
        this.detailView =  new detailView({
          model: model, 
          opts: {
            showNext: showNext,
            showPrevious: showPrevious
          }
        });
        this.$el.append(this.detailView.render().el);
      }
      
    },

    showPreviousDetail: function() {
      this.detailView.removeHighlight();
      var newIndex = this.currentModelIndex + 1;
      if (newIndex <= this.collection.models.length - 1) {
        this.collection.models[this.currentModelIndex + 1].set({'highlight': true});
      }
    },

    showNextDetail: function() {
      this.detailView.removeHighlight();
      var newIndex = this.currentModelIndex - 1;
      if (newIndex >= 0) {
        this.collection.models[this.currentModelIndex - 1].set({'highlight': true});
      }
    },

    render: function() {
      this.$el.empty();
      this.collection.each(this.addOne, this);
      // this.$el.addClass('iapp-card-wrap-full-width');
      
      var $el = this.$el;
      var _this = this;
      $el.isotope( {
          itemSelector: '.card',
          transitionDuration: (!config.isMobile) ? '0.2s' : 0,
          getSortData: {
            appearances: function(itemElem) {
              return parseInt(jQuery(itemElem).data('appearances'));
            }
          },
          sortBy: 'appearances',
          sortAscending: false
        });
      
      $el.imagesLoaded( function() {
        _this.relayout();
        _this.unveilImages();
    
      });
    },

    unveilImages: function() {
      var _this = this;
      this.$('.cover-img').unveil(500, function() {
        $(this).imagesLoaded(function() {
          _this.relayout();
        });
      });
    }, 


    filter: function(filterArray) {
        filterArray = _.map(filterArray, function(filter) {
          return '.' + filter;
        });
        var filterStr = filterArray.join('');
        this.$el.isotope({ filter: filterStr });
        _.delay(function() {
          $(window).trigger('scroll');
        }, 1000);

        _.delay(function() {
          $(window).trigger('scroll');
        }, 2000);
    },
    searchByName: function(name) {
        this.$el.isotope({
            filter: function() {
                var itemName = $(this).data("search-name").toString();
                return itemName.indexOf(name) > -1;
            }
        });
        numResults = this.$el.data('isotope').filteredItems.length;
        if (numResults === 0) {
            this.$noResultsMessage.show();
            this.$el.css('height', 'auto');
        } else {
            this.$noResultsMessage.hide();
        }
    },

    relayout: _.throttle(function() {
      this.$el.isotope('layout');
      _.delay(function() {
          $(window).trigger('scroll');
        }, 1000);
    }, 500),

    clearFilters: function(e) {
      this.currentFilter = [];
      this.$el.find(".iapp-filter-button-clear").removeClass("show");
      this.$el.find(".iapp-filters-wrap").find(".iapp-filter-button").removeClass("iapp-selected");
      this.$el.isotope({ filter: "" });
    },

    onMenuShow: function() {
      this.$el.removeClass('iapp-card-wrap-full-width');
      this.relayout();
    },

    onMenuHide: function() {
      this.$el.addClass('iapp-card-wrap-full-width');
      this.relayout();
    },

    onRouteShare: function() {
      var _this = this;
      _.defer(function() {
        _this.$el.isotope({filter: '.iapp-liked, .iapp-disliked'});
        _this.$el.isotope('updateSortData').isotope({sortBy: 'liked'});
      });
    },

    onAppReset: function() {
      this.clearFilters();
      this.relayout();
    }
  });

});
