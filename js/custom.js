(function ($) {

  "use strict";

  $('body').addClass('dark-mode');
    $('.work_container .content').addClass('dark-mode');
    $('.work_container .date').addClass('dark-mode');

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')   
        
        // Toggle dark mode for work container content
        $('.work_container .content').toggleClass('dark-mode');
        $('.work_container .date').toggleClass('dark-mode');
    })

    

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);
