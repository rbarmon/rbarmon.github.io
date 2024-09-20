(function ($) {

  "use strict";

  // $('body').addClass('dark-mode');
  //   $('.work_container .content').addClass('dark-mode');
  //   $('.work_container .date').addClass('dark-mode');
        document.getElementById('toggle-language').addEventListener('click', function () {
            const langToggleButton = this;
            const isEnglish = langToggleButton.textContent === "日本語";
    
            // Toggle button text
            langToggleButton.textContent = isEnglish ? "English" : "日本語";
    
            // Switch language for all elements with `data-en` and `data-ja`
            document.querySelectorAll('[data-en]').forEach(function (el) {
                const enText = el.getAttribute('data-en');
                const jaText = el.getAttribute('data-ja');
                el.textContent = isEnglish ? jaText : enText;
            });

            // Switch language for `data-hover` attributes
            document.querySelectorAll('[data-hover]').forEach(function (element) {
              const enText = element.getAttribute('data-en');
              const jaText = element.getAttribute('data-ja');
              const hoverText = isEnglish ? jaText : enText;
              element.setAttribute('data-hover', hoverText); // Set hover text
          });


        });
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
