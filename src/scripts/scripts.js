// ScrollMagic section pinning
(function() {
  'use strict';

  function init() {
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave'
      }
    });

    var slides = document.querySelectorAll('div.section');

    for (var i = 0; i < slides.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: slides[i]
      })
        .setPin(slides[i])
        .addTo(controller);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
