// Site initialization
(function() {
  'use strict';

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function init() {
    // Set current year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // ScrollMagic section pinning (disabled on mobile for better touch scrolling)
    if (!isMobile()) {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
