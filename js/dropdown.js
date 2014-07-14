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
    
    $(function(){
		var dropdown = $('.dropdown');
		
		new DropDown(dropdown);
		
		$(document).click(function() {
			// Remove class from all dropdowns
			dropdown.removeClass('dropdown-active');
		});
	});
}(jQuery));