(function($){	
  /**
   * Determine if responsive navigation text needs to be added.
   *
   * @method responsiveNav
   * @return {Object} naver A naver plugin instantiation
   */
  $.fn.responsiveNav = function() { 
    // Loop through each instance of responsive navigation
    this.each(function(index) {
      var labelState = $(this).hasClass( "nav-responsive-text" );
      
      return $(this).naver({
        maxWidth: "768px",
        label: labelState
      });
    });
  };
}(jQuery));

jQuery(document).ready(function() {	
  jQuery(".nav-responsive, .nav-responsive-left, .nav-responsive-center").responsiveNav();
});