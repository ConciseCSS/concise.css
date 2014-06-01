//----------------------------- responsiveNav() ------------------------------
// Description: Determine if responsive navigation text needs to be added	
//       Notes: 
//-----------------------------------------------------------------------------
(function($) {
	$.fn.responsiveNav = function() { 
		// Loop through each instance of responsive navigation
		this.each(function(index) {	
			if ($(this).hasClass( "nav-responsive-text" )) {
			
				// Store result in variable
				var labelState = true;
			} else { 
				var labelState = false;
			}
		
			// Return `naver` plugin instantiation
			return $(this).naver({
				maxWidth: "768px",
				label: labelState
			});
		});
	};
}(jQuery));

//----------------------------- nonResponsive() -------------------------------
// Description: Calculates proper widths for non-responsive websites.
//       Notes: Only necessary for non-responsive websites.
//-----------------------------------------------------------------------------
(function($) {
	$.fn.nonResponsive = function() { 
		// Loop through each instance of the `.non-responsive` class
		this.each(function(index) {	
			if ($(this).hasClass("non-responsive")) {
			
				// Get container width
				var containerWidth = $(".container").width();
				
				// Calculate object width
				(function($){
					$.fn.calculateWidth = function() {
						var objectWidth = $(this).width();
						
						return objectWidth;
					}; 
				})(jQuery);
				
				// Set pixel-based alternatives for grid styles
				// But first we need to know if our row has class `gutters`
				if($(this).hasClass("gutters")) {
					for ( var i = 1; i <= 24 ; i++ ) {            
						// Column width for row with gutters
						var columnWidth = ($('.column-'+i).calculateWidth());
						var gutterWidth = columnWidth * 0.02;
						
						$('.gutters .column-'+i).css("width", columnWidth - gutterWidth + "px");
					}
				} else {
					for ( var i = 1; i <= 24 ; i++ ) {            
						// Column width for normal row
						var columnWidth = $('.column-'+i).calculateWidth();
						$('.column-'+i).css("width", columnWidth - 1 + "px");
					}
				}
			}
		});
	};
}(jQuery));

//------------------------------- DropDown(el) --------------------------------
// Description: Powers the universal dropdown selector.
//       Notes: 
//-----------------------------------------------------------------------------
function DropDown(el) {
	this.dd = el;
	this.initEvents();
}

DropDown.prototype = {
	initEvents : function() {
		var obj = this;
	
		// Toggle .dropdown-active on click
		obj.dd.on('click', function(event){
			$(this).toggleClass('dropdown-active');
			event.stopPropagation();
		});
	}
}

$(function() {
	var dd = new DropDown( $('.dropdown') );

	$(document).click(function() {
	
		// Remove class from all dropdowns
		$('.dropdown').removeClass('dropdown-active');
	});
});

//-----------------------------------------------------------------------------
// Description: Allows the .close class to close parent element when clicked.
//       Notes: 
//-----------------------------------------------------------------------------
(function($) {
    $(document).on('click', '.close', function () {

        // Get .close parent div, fade out
        $(this).parents('.close-this').fadeOut('slow');
    });	
})(jQuery);

//-----------------------------------------------------------------------------
// Description: Creates animation effect for meters for maximum compatibility.
//       Notes: 
//-----------------------------------------------------------------------------
$(function() {
	$(".progress > span").each(function() {
		$(this)
			.data("origWidth", $(this).width())
			.width(0)
			.animate({
				width: $(this).data("origWidth")
			}, 1200);
	});
});

//-------------------------- $(document).ready() ------------------------------
// Description: Execute our jQuery plugins after the DOM is fully loaded.
//       Notes: 
//-----------------------------------------------------------------------------
jQuery(document).ready(function() {	
	jQuery(".nav-responsive, .nav-responsive-left, .nav-responsive-center").responsiveNav();
	jQuery("body, .row").nonResponsive();
});