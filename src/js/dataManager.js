define(
  [
    'jquery',
    'underscore',
    'backbone'
  ],
  function(jQuery, _, Backbone) {

    var hostname = window.location.hostname;

    var dataURL;

    if ((hostname == "localhost" || hostname == "10.0.2.2")) {
        dataURL = 'data/data.json';
    } else {


        dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/11/paris-victims/data/data.json";

    }

    //will check against networks and categories later 
    //we have to track them seperately
    var networkFilters = ['abc', 'cnn', 'nbc', 'fox', 'cbs'];
    var categoryFilters = ['house', 'senate', 'admin', 'other_political', 'journalist', 'other'];

    return {
        data: {},
        getData: function() {
            var _this = this;
            jQuery.getJSON(dataURL, function(data) {        
                _this.data = data[0];
                _this.data.copy = _this.data.copy[0];
                // _.each(_this.data.people, function(dataObj) {
                //     _.extend(dataObj, {
                //         searchName: _this._normalizeName(dataObj.guest)
                //     });
                // });
                // _this.organizeTags();
                Backbone.trigger("data:ready", this);
            });
        },
        organizeTags: function() {
            var _this = this;
            var tags = [];
            _this.data.filters = _.map(_this.data.filters, function(filter){
                tagObj =  {
                    tagName: _this.cleanTag(filter.filter),
                    tagPretty: filter.display_name,
                    isNetwork: false,
                    isCategory: false,
                    tagCategory: filter.category
                };
                //check to see if the tag is a network
                if (_.contains(networkFilters, tagObj.tagName)) {
                    tagObj.isNetwork = true;
                }

                //check to see if it is a category
                if (_.contains(categoryFilters, tagObj.tagName)) {
                    tagObj.isCategory = true;
                }

                return tagObj;
            });
        },
        cleanTag: function(tagName) {
            return tagName.replace(/\n+/g, "-").toLowerCase();
        },
        userName: '',
        base_url: 'http://www.gannett-cdn.com/experiments/usatoday/2015/03/sunday-shows/img/',
        _normalizeName: function(name) {
            var noSpaces = name.toLowerCase().trim().replace(/\s+/g, "_");
            var noAmpersands = noSpaces.replace(/&+/g, "and");
            var noPunctuation = noAmpersands.replace(/[\.,-\/#!$%\^&\*;:{}=\-`~()]/g,"");
            return noPunctuation.toString();
        }
    };

    

});
