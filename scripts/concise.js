(function($){
	/**
	 * Powers the universal dropdown selector.
	 *
	 * @class DropDown
	 * @param {Object} el jQuery object
	 */
	function DropDown(el) {
		this.dd = el;
		this.initEvents();
	}
	
	DropDown.prototype = {
		initEvents : function() {			
			// Toggle .dropdown-active on click
			this.dd.on('click', function(event){
				$(this).toggleClass('dropdown-active');
				event.stopPropagation();
			});
		}
	}
	
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
		
	$(function(){
		var dropdown = $('.dropdown');
		
		new DropDown(dropdown);
		
		$(document).click(function() {
			// Remove class from all dropdowns
			dropdown.removeClass('dropdown-active');
		});
	});
}(jQuery));

jQuery(document).ready(function() {	
    jQuery(".nav-responsive, .nav-responsive-left, .nav-responsive-center").responsiveNav();
    jQuery("body, .row").nonResponsive();
	
	$(document).on('click', '.close', function () {
        // Get .close parent div, fade out
        $(this).parents('.close-this').fadeOut('slow');
    });	
});