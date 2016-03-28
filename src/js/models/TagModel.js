define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],
  function(jQuery, _, Backbone){

    return Backbone.Model.extend( {
        defaults: {
            'tagName': '',
            'isAvailable': true,
            'isActive': false
        },

        initialize: function() {
            if (this.get('tagName') == 'iapp-liked' || this.get('tagName') == 'iapp-disliked') {
                this.set({
                    isAvailable: false
                });
            }
        }
    });

});
