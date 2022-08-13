jQuery(document).ready(function($){
   
});
$('.date-slider').slick({
  dots: false,
  infinite: false,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 4,
  arrows:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});



