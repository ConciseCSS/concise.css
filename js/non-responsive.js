(function($){  
  /**
   * Calculate object width
   *
   */
  $.fn.calculateWidth = function() { 
    return $(this).width();
  };

  /**
   * Calculates proper widths for non-responsive websites.
   *
   * @method nonResponsive
   * @note Only necessary for non-responsive websites.
   */
  $.fn.nonResponsive = function() {
    
    // Loop through each instance of the `.non-responsive` class
    this.each(function(index) {
      if ($(this).hasClass("non-responsive")) {
        // Get container width
        var containerWidth = $(".container").width(),
        i = 1,
        max = 24;
        
        // Set pixel-based alternatives for grid styles
        // But first we need to know if our row has class `gutters`
        if($(this).hasClass("gutters")) {
          for (; i <= max; i++ ) {      
            // Column width for row with gutters
            var columnWidth = ($('.column-'+i).calculateWidth()),
            gutterWidth = columnWidth * 0.02;

            $('.gutters .column-'+i).css("width", columnWidth - gutterWidth + "px");
          }
        } else {
          for (; i <= max ; i++ ) {
            // Column width for normal row
            var columnWidth = ($('.column-'+i).calculateWidth() - 1);
            
            $('.column-'+i).css("width", columnWidth + "px");
          }
        }
      }
    });
  };
}(jQuery));

jQuery(document).ready(function() {  
  jQuery("body, .row").nonResponsive();
});