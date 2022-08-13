$(document).ready(function(){
	jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
	var wow = new WOW({
        mobile: false  // trigger animations on mobile devices (default is true)
    });
    wow.init();
	jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    type: 'iframe',
	   iframe: {
	     patterns: {
	       youtube: {
	         index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

	         id: 'v=', // String that splits URL in a two parts, second part should be %id%
	         // Or null - full URL will be returned
	         // Or a function that should return %id%, for example:
	         // id: function(url) { return 'parsed id'; }

	         src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
	       }
	       
	     },

    srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
  }
  })
})