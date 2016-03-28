define([
    "jquery", 
    "underscore", 
    "backbone", 
    "api/analytics", 
    "templates",
    "models/config",
    "router"
    ], 
    function(jQuery, _, Backbone, Analytics, templates, config, router) {
      return Backbone.View.extend({
        tagName: "div",
        className: "iapp-modal",
        template: templates["card-back.html"],

        events: {
          "click .close-card": "removeHighlight",
          "click .facebook-share": "facebookShare",
          "click .twitter-share": "twitterShare",
          "click .iapp-detail-bg": "removeHighlight",
          'click .iapp-like-button': 'onLikeClick',
          'click .iapp-dislike-button': 'onDislikeClick',
          'click .iapp-next-detail': 'onNextClick',
          'click .iapp-previous-detail': 'onPreviousClick'
        },

        initialize: function(args) {

          // router.navigate("movie/" + this.model.get("rowNumber"));
          this.listenTo(Backbone, "highlight:remove", this.removeHighlight);
          this.listenTo(this.model, 'change:isLiked', this.onLikeChange);
          this.listenTo(this.model, 'change:isDisliked', this.onDislikeChange);
          this.listenTo(this.model, 'change:highlight', this.removeCard);
          this.listenTo(Backbone, "window:keydown", this.onKeyDown);
          this.opts = args.opts;
        },
        render: function() {
          this.$el.empty();
          $('body').addClass('iapp-no-scroll');

          if (this.model.get('isLiked')) {
            this.$el.addClass('iapp-liked');
          } else if (this.model.get('isDisliked')) {
            this.$el.addClass('iapp-disliked');
          }

          
          this.$el.html(this.template({person: this.model.toJSON(), showNext: this.opts.showNext, showPrevious: this.opts.showPrevious}));   
          this.postRender(this.$el);
          return this;
        },

        postRender: function(element) {

          _.defer(function() {

            element.addClass("modal-show");
          }, element);
            
        },

        removeCard: function(model) {

            if(!model.get('highlight')) {
            
                $('body').removeClass('iapp-no-scroll');
              
                
                this.$el.removeClass("modal-show");
                var _this = this;
                
                  _this.remove();
            
            }
           
        
          
        },

        onNextClick: function() {
          Backbone.trigger("detail:next");
        },
        onPreviousClick: function() {
          Backbone.trigger("detail:previous");
        },


        removeHighlight: function() {
          this.model.set({"highlight": false});
        },

        onLikeClick: function() {
          this.model.undislike();
            if (!this.model.get('isLiked')) {
              this.model.like();
            } else {
              this.model.unlike();
            }
            
        },

        onDislikeClick: function() {
          this.model.unlike();

            if (!this.model.get('isDisliked')) {
              this.model.dislike();
            } else {
              this.model.undislike();
            }
        },

        onLikeChange: function() {
          if (this.model.get('isLiked')) {
            this.$el.addClass('iapp-liked');
          } else {
            this.$el.removeClass('iapp-liked');
          }
        },
        onDislikeChange: function() {
          if (this.model.get('isDisliked')) {
            this.$el.addClass('iapp-disliked');
          } else {
            this.$el.removeClass('iapp-disliked');
          }
        },
        onKeyDown: function(e) {
          if (e.keyCode == 37 && this.opts.showPrevious) {
            this.onPreviousClick();
          }
          if (e.keyCode == 39 && this.opts.showNext) {
            this.onNextClick();
          }
        }

    });
});
