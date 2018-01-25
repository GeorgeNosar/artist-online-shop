$(".popup").magnificPopup(
{
  removalDelay: 350,
  mainClass: 'mfp-fade'
});

$(".carousel").owlCarousel({
		loop:true,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: false,
		autoplaySpeed: 700,
		items: 1,
		mouseDrag: false,
		dots: false,
	});