define([
  'require',
  'jquery',
  'isotope',
  'underscore',
  'lib/BackboneRouter',
  'models/config',
  'views/appView',
  'dataManager',
  'jquery_ui_touch_punch'
  ], 
  function(require, jQuery, Isotope, _, Backbone, config, appView, dataManager) {


  return {

    //define entry point init function
    init: function() {

        //require jquery-bridget for puluginizing Isotope
        require( [ 'jquery-bridget/jquery.bridget' ],
            function() {
            // make Isotope a jQuery plugin
            $.bridget( 'isotope', Isotope );

            // add class for mobile or tabled
            if (config.isTablet || config.isMobile) {
                $('.iapp-page-wrap').addClass('iapp-touch-device');
            }
            
            //turn resize and scroll into Backbone events
            $(window).on('resize', function(e) {
                Backbone.trigger('window:resize');
            });

            $(window).on('scroll', function() {
                Backbone.trigger('window:scroll');
            });

            $(window).on('keydown', function(e) {
                Backbone.trigger('window:keydown', e);
            });


            //Make data request
          
            dataManager.getData();

            //Create app view
            appview = new appView();
          
        }
      );   
    }
  };
});
