jQuery(document).ready(function() {
  $(document).on('click', '.close', function () {
    // Get .close parent div, fade out
    $(this).parents('.close-this').fadeOut('slow');
  });
});
