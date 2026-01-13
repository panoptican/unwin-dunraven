
$(function(){

	// initialize ScrollMagic
	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave'
		}
	});

	// get all sections
	var slides = document.querySelectorAll("div.section");

	// create scene for each section
	for (var i=0; i<slides.length; i++) {
		new ScrollMagic.Scene({
				triggerElement: slides[i]
			})
			.setPin(slides[i])
			.addTo(controller);
	}
})